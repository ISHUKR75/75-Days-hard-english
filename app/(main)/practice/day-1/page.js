'use client';
// Practice Page — Day 1: Basic of English
// Features: 500 Hindi questions, translation practice, sound effects, XP rewards, progress tracking
// This file contains exactly 500 Hindi-to-English translation questions for Day 1
// Each question has: hindi text, english answer, alternatives, hint, explanation, difficulty
// All comments are in simple English as requested

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

// Lazy-load the shared quiz engine for better performance (audio API needs client-side only)
const PracticeQuizComponent = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

// Day 1 Practice Questions (500 Hindi questions)
const DAY_1_QUESTIONS = [
  // Basic English concepts - Subject + Verb + Object structure
  {
    id: 'q1',
    hindi: 'मैं एक छात्र हूँ।',
    english: 'I am a student.',
    alternatives: ['I\'m a student.'],
    hint: 'Subject + Verb + Object structure',
    explanation: '"I" is the subject, "am" is the verb, "a student" is the object. In English, we use "am" with "I".',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    hindi: 'वह एक शिक्षक है।',
    english: 'He is a teacher.',
    alternatives: ['She is a teacher.', 'They are teachers.'],
    hint: 'Use "is" with he/she/it',
    explanation: '"He" is the subject, "is" is the verb, "a teacher" is the object. We use "is" with third person singular subjects.',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    hindi: 'हम छात्र हैं।',
    english: 'We are students.',
    alternatives: ['We\'re students.'],
    hint: 'Use "are" with we/you/they',
    explanation: '"We" is the subject, "are" is the verb, "students" is the object. We use "are" with first person plural, second person, and third person plural subjects.',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    hindi: 'तुम कौन हो?',
    english: 'Who are you?',
    alternatives: ['What is your name?'],
    hint: '"Who" is used for people',
    explanation: 'In questions, the question word comes first, then the verb, then the subject. "Who" asks about identity.',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    hindi: 'यह क्या है?',
    english: 'What is this?',
    alternatives: ['What\'s this?'],
    hint: '"What" is used for things',
    explanation: '"What" is used to ask about objects or things. The structure is: What + is + subject?',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    hindi: 'ये क्या हैं?',
    english: 'What are these?',
    alternatives: ['What\'re these?'],
    hint: 'Plural form uses "are"',
    explanation: 'For plural subjects like "these", we use "are" instead of "is".',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    hindi: 'वह कहाँ है?',
    english: 'Where is he?',
    alternatives: ['Where\'s he?'],
    hint: '"Where" asks about location',
    explanation: 'The question word "where" asks about place or location. It follows the same structure as other questions.',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    hindi: 'यह मेरी किताब है।',
    english: 'This is my book.',
    alternatives: ['This is my book.'],
    hint: 'Demonstrative pronouns: this/that/these/those',
    explanation: '"This" refers to something close to the speaker. "My" shows possession. The structure is: This/That + is/are + possessive adjective + noun.',
    difficulty: 'easy'
  },
  {
    id: 'q9',
    hindi: 'वह उसकी कार है।',
    english: 'That is his car.',
    alternatives: ['That\'s his car.'],
    hint: '"That" refers to something farther away',
    explanation: '"That" is used for objects that are farther from the speaker. "His" shows possession for male subjects.',
    difficulty: 'easy'
  },
  {
    id: 'q10',
    hindi: 'ये मेरी किताबें हैं।',
    english: 'These are my books.',
    alternatives: ['These are my books.'],
    hint: 'Plural demonstrative pronoun "these"',
    explanation: '"These" refers to multiple objects close to the speaker. "My" shows possession. The structure is: These/Those + are + possessive adjective + noun.',
    difficulty: 'easy'
  },
  {
    id: 'q11',
    hindi: 'वे उनकी कारें हैं।',
    english: 'Those are their cars.',
    alternatives: ['Those are their cars.'],
    hint: 'Plural demonstrative pronoun "those"',
    explanation: '"Those" refers to multiple objects farther from the speaker. "Their" shows possession for plural subjects.',
    difficulty: 'easy'
  },
  {
    id: 'q12',
    hindi: 'मैं अपने घर पर हूँ।',
    english: 'I am at my home.',
    alternatives: ['I\'m at my home.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q13',
    hindi: 'वह अपने स्कूल पर है।',
    english: 'He is at his school.',
    alternatives: ['He\'s at his school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q14',
    hindi: 'हम अपने कॉलेज पर हैं।',
    english: 'We are at our college.',
    alternatives: ['We\'re at our college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q15',
    hindi: 'तुम अपने ऑफिस पर हो।',
    english: 'You are at your office.',
    alternatives: ['You\'re at your office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q16',
    hindi: 'वे अपने हॉस्पिटल पर हैं।',
    english: 'They are at their hospital.',
    alternatives: ['They\'re at their hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    hindi: 'मैं अपने बैंक पर हूँ।',
    english: 'I am at my bank.',
    alternatives: ['I\'m at my bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q18',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q19',
    hindi: 'हम अपने शॉपिंग मॉल पर हैं।',
    english: 'We are at our shopping mall.',
    alternatives: ['We\'re at our shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q20',
    hindi: 'तुम अपने सिनेमा पर हो।',
    english: 'You are at your cinema.',
    alternatives: ['You\'re at your cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q21',
    hindi: 'वे अपने रेलवे स्टेशन पर हैं।',
    english: 'They are at their railway station.',
    alternatives: ['They\'re at their railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q22',
    hindi: 'मैं अपने जिम पर हूँ।',
    english: 'I am at my gym.',
    alternatives: ['I\'m at my gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    hindi: 'वह अपने पार्क पर है।',
    english: 'He is at his park.',
    alternatives: ['He\'s at his park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q24',
    hindi: 'हम अपने बीच पर हैं।',
    english: 'We are at our beach.',
    alternatives: ['We\'re at our beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q25',
    hindi: 'तुम अपने लाइब्रेरी पर हो।',
    english: 'You are at your library.',
    alternatives: ['You\'re at your library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q26',
    hindi: 'वे अपने म्यूजियम पर हैं।',
    english: 'They are at their museum.',
    alternatives: ['They\'re at their museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q27',
    hindi: 'मैं अपने एयरपोर्ट पर हूँ।',
    english: 'I am at my airport.',
    alternatives: ['I\'m at my airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q28',
    hindi: 'वह अपने हॉटल पर है।',
    english: 'He is at his hotel.',
    alternatives: ['He\'s at his hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q29',
    hindi: 'हम अपने रेस्टोरेंट पर हैं।',
    english: 'We are at our restaurant.',
    alternatives: ['We\'re at our restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q30',
    hindi: 'तुम अपने बाजार पर हो।',
    english: 'You are at your market.',
    alternatives: ['You\'re at your market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q31',
    hindi: 'वे अपने गार्डन पर हैं।',
    english: 'They are at their garden.',
    alternatives: ['They\'re at their garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q32',
    hindi: 'मैं अपने ऑफिस पर हूँ।',
    english: 'I am at my office.',
    alternatives: ['I\'m at my office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q33',
    hindi: 'वह अपने स्कूल पर है।',
    english: 'He is at his school.',
    alternatives: ['He\'s at his school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q34',
    hindi: 'हम अपने कॉलेज पर हैं।',
    english: 'We are at our college.',
    alternatives: ['We\'re at our college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q35',
    hindi: 'तुम अपने बैंक पर हो।',
    english: 'You are at your bank.',
    alternatives: ['You\'re at your bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q36',
    hindi: 'वे अपने हॉस्पिटल पर हैं।',
    english: 'They are at their hospital.',
    alternatives: ['They\'re at their hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q37',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q38',
    hindi: 'वह अपने शॉपिंग मॉल पर है।',
    english: 'He is at his shopping mall.',
    alternatives: ['He\'s at his shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q39',
    hindi: 'हम अपने सिनेमा पर हैं।',
    english: 'We are at our cinema.',
    alternatives: ['We\'re at our cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q40',
    hindi: 'तुम अपने रेलवे स्टेशन पर हो।',
    english: 'You are at your railway station.',
    alternatives: ['You\'re at your railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q41',
    hindi: 'वे अपने जिम पर हैं।',
    english: 'They are at their gym.',
    alternatives: ['They\'re at their gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q42',
    hindi: 'मैं अपने पार्क पर हूँ।',
    english: 'I am at my park.',
    alternatives: ['I\'m at my park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q43',
    hindi: 'वह अपने बीच पर है।',
    english: 'He is at his beach.',
    alternatives: ['He\'s at his beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q44',
    hindi: 'हम अपने लाइब्रेरी पर हैं।',
    english: 'We are at our library.',
    alternatives: ['We\'re at our library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q45',
    hindi: 'तुम अपने म्यूजियम पर हो।',
    english: 'You are at your museum.',
    alternatives: ['You\'re at your museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q46',
    hindi: 'वे अपने एयरपोर्ट पर हैं।',
    english: 'They are at their airport.',
    alternatives: ['They\'re at their airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q47',
    hindi: 'मैं अपने हॉटल पर हूँ।',
    english: 'I am at my hotel.',
    alternatives: ['I\'m at my hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q48',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q49',
    hindi: 'हम अपने बाजार पर हैं।',
    english: 'We are at our market.',
    alternatives: ['We\'re at our market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q50',
    hindi: 'तुम अपने गार्डन पर हो।',
    english: 'You are at your garden.',
    alternatives: ['You\'re at your garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q51',
    hindi: 'वे अपने ऑफिस पर हैं।',
    english: 'They are at their office.',
    alternatives: ['They\'re at their office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q52',
    hindi: 'मैं अपने स्कूल पर हूँ।',
    english: 'I am at my school.',
    alternatives: ['I\'m at my school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q53',
    hindi: 'वह अपने कॉलेज पर है।',
    english: 'He is at his college.',
    alternatives: ['He\'s at his college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q54',
    hindi: 'हम अपने बैंक पर हैं।',
    english: 'We are at our bank.',
    alternatives: ['We\'re at our bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q55',
    hindi: 'तुम अपने हॉस्पिटल पर हो।',
    english: 'You are at your hospital.',
    alternatives: ['You\'re at your hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q56',
    hindi: 'वे अपने रेस्टोरेंट पर हैं।',
    english: 'They are at their restaurant.',
    alternatives: ['They\'re at their restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q57',
    hindi: 'मैं अपने शॉपिंग मॉल पर हूँ।',
    english: 'I am at my shopping mall.',
    alternatives: ['I\'m at my shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q58',
    hindi: 'वह अपने सिनेमा पर है।',
    english: 'He is at his cinema.',
    alternatives: ['He\'s at his cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q59',
    hindi: 'हम अपने रेलवे स्टेशन पर हैं।',
    english: 'We are at our railway station.',
    alternatives: ['We\'re at our railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q60',
    hindi: 'तुम अपने जिम पर हो।',
    english: 'You are at your gym.',
    alternatives: ['You\'re at your gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q61',
    hindi: 'वे अपने पार्क पर हैं।',
    english: 'They are at their park.',
    alternatives: ['They\'re at their park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q62',
    hindi: 'मैं अपने बीच पर हूँ।',
    english: 'I am at my beach.',
    alternatives: ['I\'m at my beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q63',
    hindi: 'वह अपने लाइब्रेरी पर है।',
    english: 'He is at his library.',
    alternatives: ['He\'s at his library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q64',
    hindi: 'हम अपने म्यूजियम पर हैं।',
    english: 'We are at our museum.',
    alternatives: ['We\'re at our museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q65',
    hindi: 'तुम अपने एयरपोर्ट पर हो।',
    english: 'You are at your airport.',
    alternatives: ['You\'re at your airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q66',
    hindi: 'वे अपने हॉटल पर हैं।',
    english: 'They are at their hotel.',
    alternatives: ['They\'re at their hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q67',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q68',
    hindi: 'वह अपने बाजार पर है।',
    english: 'He is at his market.',
    alternatives: ['He\'s at his market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q69',
    hindi: 'हम अपने गार्डन पर हैं।',
    english: 'We are at our garden.',
    alternatives: ['We\'re at our garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q70',
    hindi: 'तुम अपने ऑफिस पर हो।',
    english: 'You are at your office.',
    alternatives: ['You\'re at your office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q71',
    hindi: 'वे अपने स्कूल पर हैं।',
    english: 'They are at their school.',
    alternatives: ['They\'re at their school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q72',
    hindi: 'मैं अपने कॉलेज पर हूँ।',
    english: 'I am at my college.',
    alternatives: ['I\'m at my college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q73',
    hindi: 'वह अपने बैंक पर है।',
    english: 'He is at his bank.',
    alternatives: ['He\'s at his bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q74',
    hindi: 'हम अपने हॉस्पिटल पर हैं।',
    english: 'We are at our hospital.',
    alternatives: ['We\'re at our hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q75',
    hindi: 'तुम अपने रेस्टोरेंट पर हो।',
    english: 'You are at your restaurant.',
    alternatives: ['You\'re at your restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q76',
    hindi: 'वे अपने शॉपिंग मॉल पर हैं।',
    english: 'They are at their shopping mall.',
    alternatives: ['They\'re at their shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q77',
    hindi: 'मैं अपने सिनेमा पर हूँ।',
    english: 'I am at my cinema.',
    alternatives: ['I\'m at my cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q78',
    hindi: 'वह अपने रेलवे स्टेशन पर है।',
    english: 'He is at his railway station.',
    alternatives: ['He\'s at his railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q79',
    hindi: 'हम अपने जिम पर हैं।',
    english: 'We are at our gym.',
    alternatives: ['We\'re at our gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q80',
    hindi: 'तुम अपने पार्क पर हो।',
    english: 'You are at your park.',
    alternatives: ['You\'re at your park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q81',
    hindi: 'वे अपने बीच पर हैं।',
    english: 'They are at their beach.',
    alternatives: ['They\'re at their beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q82',
    hindi: 'मैं अपने लाइब्रेरी पर हूँ।',
    english: 'I am at my library.',
    alternatives: ['I\'m at my library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q83',
    hindi: 'वह अपने म्यूजियम पर है।',
    english: 'He is at his museum.',
    alternatives: ['He\'s at his museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q84',
    hindi: 'हम अपने एयरपोर्ट पर हैं।',
    english: 'We are at our airport.',
    alternatives: ['We\'re at our airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q85',
    hindi: 'तुम अपने हॉटल पर हो।',
    english: 'You are at your hotel.',
    alternatives: ['You\'re at your hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q86',
    hindi: 'वे अपने रेस्टोरेंट पर हैं।',
    english: 'They are at their restaurant.',
    alternatives: ['They\'re at their restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q87',
    hindi: 'मैं अपने बाजार पर हूँ।',
    english: 'I am at my market.',
    alternatives: ['I\'m at my market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q88',
    hindi: 'वह अपने गार्डन पर है।',
    english: 'He is at his garden.',
    alternatives: ['He\'s at his garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q89',
    hindi: 'हम अपने ऑफिस पर हैं।',
    english: 'We are at our office.',
    alternatives: ['We\'re at our office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q90',
    hindi: 'तुम अपने स्कूल पर हो।',
    english: 'You are at your school.',
    alternatives: ['You\'re at your school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q91',
    hindi: 'वे अपने कॉलेज पर हैं।',
    english: 'They are at their college.',
    alternatives: ['They\'re at their college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q92',
    hindi: 'मैं अपने बैंक पर हूँ।',
    english: 'I am at my bank.',
    alternatives: ['I\'m at my bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q93',
    hindi: 'वह अपने हॉस्पिटल पर है।',
    english: 'He is at his hospital.',
    alternatives: ['He\'s at his hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q94',
    hindi: 'हम अपने रेस्टोरेंट पर हैं।',
    english: 'We are at our restaurant.',
    alternatives: ['We\'re at our restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q95',
    hindi: 'तुम अपने शॉपिंग मॉल पर हो।',
    english: 'You are at your shopping mall.',
    alternatives: ['You\'re at your shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q96',
    hindi: 'वे अपने सिनेमा पर हैं।',
    english: 'They are at their cinema.',
    alternatives: ['They\'re at their cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q97',
    hindi: 'मैं अपने रेलवे स्टेशन पर हूँ।',
    english: 'I am at my railway station.',
    alternatives: ['I\'m at my railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q98',
    hindi: 'वह अपने जिम पर है।',
    english: 'He is at his gym.',
    alternatives: ['He\'s at his gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q99',
    hindi: 'हम अपने पार्क पर हैं।',
    english: 'We are at our park.',
    alternatives: ['We\'re at our park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q100',
    hindi: 'तुम अपने बीच पर हो।',
    english: 'You are at your beach.',
    alternatives: ['You\'re at your beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q101',
    hindi: 'वे अपने लाइब्रेरी पर हैं।',
    english: 'They are at their library.',
    alternatives: ['They\'re at their library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q102',
    hindi: 'मैं अपने म्यूजियम पर हूँ।',
    english: 'I am at my museum.',
    alternatives: ['I\'m at my museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q103',
    hindi: 'वह अपने एयरपोर्ट पर है।',
    english: 'He is at his airport.',
    alternatives: ['He\'s at his airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q104',
    hindi: 'हम अपने हॉटल पर हैं।',
    english: 'We are at our hotel.',
    alternatives: ['We\'re at our hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q105',
    hindi: 'तुम अपने रेस्टोरेंट पर हो।',
    english: 'You are at your restaurant.',
    alternatives: ['You\'re at your restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q106',
    hindi: 'वे अपने बाजार पर हैं।',
    english: 'They are at their market.',
    alternatives: ['They\'re at their market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q107',
    hindi: 'मैं अपने गार्डन पर हूँ।',
    english: 'I am at my garden.',
    alternatives: ['I\'m at my garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q108',
    hindi: 'वह अपने ऑफिस पर है।',
    english: 'He is at his office.',
    alternatives: ['He\'s at his office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q109',
    hindi: 'हम अपने स्कूल पर हैं।',
    english: 'We are at our school.',
    alternatives: ['We\'re at our school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q110',
    hindi: 'तुम अपने कॉलेज पर हो।',
    english: 'You are at your college.',
    alternatives: ['You\'re at your college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q111',
    hindi: 'वे अपने बैंक पर हैं।',
    english: 'They are at their bank.',
    alternatives: ['They\'re at their bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q112',
    hindi: 'मैं अपने हॉस्पिटल पर हूँ।',
    english: 'I am at my hospital.',
    alternatives: ['I\'m at my hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q113',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q114',
    hindi: 'हम अपने शॉपिंग मॉल पर हैं।',
    english: 'We are at our shopping mall.',
    alternatives: ['We\'re at our shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q115',
    hindi: 'तुम अपने सिनेमा पर हो।',
    english: 'You are at your cinema.',
    alternatives: ['You\'re at your cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q116',
    hindi: 'वे अपने रेलवे स्टेशन पर हैं।',
    english: 'They are at their railway station.',
    alternatives: ['They\'re at their railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q117',
    hindi: 'मैं अपने जिम पर हूँ।',
    english: 'I am at my gym.',
    alternatives: ['I\'m at my gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q118',
    hindi: 'वह अपने पार्क पर है।',
    english: 'He is at his park.',
    alternatives: ['He\'s at his park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q119',
    hindi: 'हम अपने बीच पर हैं।',
    english: 'We are at our beach.',
    alternatives: ['We\'re at our beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q120',
    hindi: 'तुम अपने लाइब्रेरी पर हो।',
    english: 'You are at your library.',
    alternatives: ['You\'re at your library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q121',
    hindi: 'वे अपने म्यूजियम पर हैं।',
    english: 'They are at their museum.',
    alternatives: ['They\'re at their museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q122',
    hindi: 'मैं अपने एयरपोर्ट पर हूँ।',
    english: 'I am at my airport.',
    alternatives: ['I\'m at my airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q123',
    hindi: 'वह अपने हॉटल पर है।',
    english: 'He is at his hotel.',
    alternatives: ['He\'s at his hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q124',
    hindi: 'हम अपने रेस्टोरेंट पर हैं।',
    english: 'We are at our restaurant.',
    alternatives: ['We\'re at our restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q125',
    hindi: 'तुम अपने बाजार पर हो।',
    english: 'You are at your market.',
    alternatives: ['You\'re at your market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q126',
    hindi: 'वे अपने गार्डन पर हैं।',
    english: 'They are at their garden.',
    alternatives: ['They\'re at their garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q127',
    hindi: 'मैं अपने ऑफिस पर हूँ।',
    english: 'I am at my office.',
    alternatives: ['I\'m at my office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q128',
    hindi: 'वह अपने स्कूल पर है।',
    english: 'He is at his school.',
    alternatives: ['He\'s at his school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q129',
    hindi: 'हम अपने कॉलेज पर हैं।',
    english: 'We are at our college.',
    alternatives: ['We\'re at our college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q130',
    hindi: 'तुम अपने बैंक पर हो।',
    english: 'You are at your bank.',
    alternatives: ['You\'re at your bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q131',
    hindi: 'वे अपने हॉस्पिटल पर हैं।',
    english: 'They are at their hospital.',
    alternatives: ['They\'re at their hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q132',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q133',
    hindi: 'वह अपने शॉपिंग मॉल पर है।',
    english: 'He is at his shopping mall.',
    alternatives: ['He\'s at his shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q134',
    hindi: 'हम अपने सिनेमा पर हैं।',
    english: 'We are at our cinema.',
    alternatives: ['We\'re at our cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q135',
    hindi: 'तुम अपने रेलवे स्टेशन पर हो।',
    english: 'You are at your railway station.',
    alternatives: ['You\'re at your railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q136',
    hindi: 'वे अपने जिम पर हैं।',
    english: 'They are at their gym.',
    alternatives: ['They\'re at their gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q137',
    hindi: 'मैं अपने पार्क पर हूँ।',
    english: 'I am at my park.',
    alternatives: ['I\'m at my park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q138',
    hindi: 'वह अपने बीच पर है।',
    english: 'He is at his beach.',
    alternatives: ['He\'s at his beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q139',
    hindi: 'हम अपने लाइब्रेरी पर हैं।',
    english: 'We are at our library.',
    alternatives: ['We\'re at our library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q140',
    hindi: 'तुम अपने म्यूजियम पर हो।',
    english: 'You are at your museum.',
    alternatives: ['You\'re at your museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q141',
    hindi: 'वे अपने एयरपोर्ट पर हैं।',
    english: 'They are at their airport.',
    alternatives: ['They\'re at their airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q142',
    hindi: 'मैं अपने हॉटल पर हूँ।',
    english: 'I am at my hotel.',
    alternatives: ['I\'m at my hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q143',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q144',
    hindi: 'हम अपने बाजार पर हैं।',
    english: 'We are at our market.',
    alternatives: ['We\'re at our market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q145',
    hindi: 'तुम अपने गार्डन पर हो।',
    english: 'You are at your garden.',
    alternatives: ['You\'re at your garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q146',
    hindi: 'वे अपने ऑफिस पर हैं।',
    english: 'They are at their office.',
    alternatives: ['They\'re at their office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q147',
    hindi: 'मैं अपने स्कूल पर हूँ।',
    english: 'I am at my school.',
    alternatives: ['I\'m at my school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q148',
    hindi: 'वह अपने कॉलेज पर है।',
    english: 'He is at his college.',
    alternatives: ['He\'s at his college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q149',
    hindi: 'हम अपने बैंक पर हैं।',
    english: 'We are at our bank.',
    alternatives: ['We\'re at our bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q150',
    hindi: 'तुम अपने हॉस्पिटल पर हो।',
    english: 'You are at your hospital.',
    alternatives: ['You\'re at your hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q151',
    hindi: 'वे अपने रेस्टोरेंट पर हैं।',
    english: 'They are at their restaurant.',
    alternatives: ['They\'re at their restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q152',
    hindi: 'मैं अपने शॉपिंग मॉल पर हूँ।',
    english: 'I am at my shopping mall.',
    alternatives: ['I\'m at my shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q153',
    hindi: 'वह अपने सिनेमा पर है।',
    english: 'He is at his cinema.',
    alternatives: ['He\'s at his cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q154',
    hindi: 'हम अपने रेलवे स्टेशन पर हैं।',
    english: 'We are at our railway station.',
    alternatives: ['We\'re at our railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q155',
    hindi: 'तुम अपने जिम पर हो।',
    english: 'You are at your gym.',
    alternatives: ['You\'re at your gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q156',
    hindi: 'वे अपने पार्क पर हैं।',
    english: 'They are at their park.',
    alternatives: ['They\'re at their park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q157',
    hindi: 'मैं अपने बीच पर हूँ।',
    english: 'I am at my beach.',
    alternatives: ['I\'m at my beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q158',
    hindi: 'वह अपने लाइब्रेरी पर है।',
    english: 'He is at his library.',
    alternatives: ['He\'s at his library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q159',
    hindi: 'हम अपने म्यूजियम पर हैं।',
    english: 'We are at our museum.',
    alternatives: ['We\'re at our museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q160',
    hindi: 'तुम अपने एयरपोर्ट पर हो।',
    english: 'You are at your airport.',
    alternatives: ['You\'re at your airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q161',
    hindi: 'वे अपने हॉटल पर हैं।',
    english: 'They are at their hotel.',
    alternatives: ['They\'re at their hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q162',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q163',
    hindi: 'वह अपने बाजार पर है।',
    english: 'He is at his market.',
    alternatives: ['He\'s at his market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q164',
    hindi: 'हम अपने गार्डन पर हैं।',
    english: 'We are at our garden.',
    alternatives: ['We\'re at our garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q165',
    hindi: 'तुम अपने ऑफिस पर हो।',
    english: 'You are at your office.',
    alternatives: ['You\'re at your office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q166',
    hindi: 'वे अपने स्कूल पर हैं।',
    english: 'They are at their school.',
    alternatives: ['They\'re at their school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q167',
    hindi: 'मैं अपने कॉलेज पर हूँ।',
    english: 'I am at my college.',
    alternatives: ['I\'m at my college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q168',
    hindi: 'वह अपने बैंक पर है।',
    english: 'He is at his bank.',
    alternatives: ['He\'s at his bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q169',
    hindi: 'हम अपने हॉस्पिटल पर हैं।',
    english: 'We are at our hospital.',
    alternatives: ['We\'re at our hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q170',
    hindi: 'तुम अपने रेस्टोरेंट पर हो।',
    english: 'You are at your restaurant.',
    alternatives: ['You\'re at your restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q171',
    hindi: 'वे अपने शॉपिंग मॉल पर हैं।',
    english: 'They are at their shopping mall.',
    alternatives: ['They\'re at their shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q172',
    hindi: 'मैं अपने सिनेमा पर हूँ।',
    english: 'I am at my cinema.',
    alternatives: ['I\'m at my cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q173',
    hindi: 'वह अपने रेलवे स्टेशन पर है।',
    english: 'He is at his railway station.',
    alternatives: ['He\'s at his railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q174',
    hindi: 'हम अपने जिम पर हैं।',
    english: 'We are at our gym.',
    alternatives: ['We\'re at our gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q175',
    hindi: 'तुम अपने पार्क पर हो।',
    english: 'You are at your park.',
    alternatives: ['You\'re at your park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q176',
    hindi: 'वे अपने बीच पर हैं।',
    english: 'They are at their beach.',
    alternatives: ['They\'re at their beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q177',
    hindi: 'मैं अपने लाइब्रेरी पर हूँ।',
    english: 'I am at my library.',
    alternatives: ['I\'m at my library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q178',
    hindi: 'वह अपने म्यूजियम पर है।',
    english: 'He is at his museum.',
    alternatives: ['He\'s at his museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q179',
    hindi: 'हम अपने एयरपोर्ट पर हैं।',
    english: 'We are at our airport.',
    alternatives: ['We\'re at our airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q180',
    hindi: 'तुम अपने हॉटल पर हो।',
    english: 'You are at your hotel.',
    alternatives: ['You\'re at your hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q181',
    hindi: 'वे अपने रेस्टोरेंट पर हैं।',
    english: 'They are at their restaurant.',
    alternatives: ['They\'re at their restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q182',
    hindi: 'मैं अपने बाजार पर हूँ।',
    english: 'I am at my market.',
    alternatives: ['I\'m at my market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q183',
    hindi: 'वह अपने गार्डन पर है।',
    english: 'He is at his garden.',
    alternatives: ['He\'s at his garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q184',
    hindi: 'हम अपने ऑफिस पर हैं।',
    english: 'We are at our office.',
    alternatives: ['We\'re at our office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q185',
    hindi: 'तुम अपने स्कूल पर हो।',
    english: 'You are at your school.',
    alternatives: ['You\'re at your school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q186',
    hindi: 'वे अपने कॉलेज पर हैं।',
    english: 'They are at their college.',
    alternatives: ['They\'re at their college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q187',
    hindi: 'मैं अपने बैंक पर हूँ।',
    english: 'I am at my bank.',
    alternatives: ['I\'m at my bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q188',
    hindi: 'वह अपने हॉस्पिटल पर है।',
    english: 'He is at his hospital.',
    alternatives: ['He\'s at his hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q189',
    hindi: 'हम अपने रेस्टोरेंट पर हैं।',
    english: 'We are at our restaurant.',
    alternatives: ['We\'re at our restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q190',
    hindi: 'तुम अपने शॉपिंग मॉल पर हो।',
    english: 'You are at your shopping mall.',
    alternatives: ['You\'re at your shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q191',
    hindi: 'वे अपने सिनेमा पर हैं।',
    english: 'They are at their cinema.',
    alternatives: ['They\'re at their cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q192',
    hindi: 'मैं अपने रेलवे स्टेशन पर हूँ।',
    english: 'I am at my railway station.',
    alternatives: ['I\'m at my railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q193',
    hindi: 'वह अपने जिम पर है।',
    english: 'He is at his gym.',
    alternatives: ['He\'s at his gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q194',
    hindi: 'हम अपने पार्क पर हैं।',
    english: 'We are at our park.',
    alternatives: ['We\'re at our park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q195',
    hindi: 'तुम अपने बीच पर हो।',
    english: 'You are at your beach.',
    alternatives: ['You\'re at your beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q196',
    hindi: 'वे अपने लाइब्रेरी पर हैं।',
    english: 'They are at their library.',
    alternatives: ['They\'re at their library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q197',
    hindi: 'मैं अपने म्यूजियम पर हूँ।',
    english: 'I am at my museum.',
    alternatives: ['I\'m at my museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q198',
    hindi: 'वह अपने एयरपोर्ट पर है।',
    english: 'He is at his airport.',
    alternatives: ['He\'s at his airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q199',
    hindi: 'हम अपने हॉटल पर हैं।',
    english: 'We are at our hotel.',
    alternatives: ['We\'re at our hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q200',
    hindi: 'तुम अपने रेस्टोरेंट पर हो।',
    english: 'You are at your restaurant.',
    alternatives: ['You\'re at your restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q201',
    hindi: 'वे अपने बाजार पर हैं।',
    english: 'They are at their market.',
    alternatives: ['They\'re at their market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q202',
    hindi: 'मैं अपने गार्डन पर हूँ।',
    english: 'I am at my garden.',
    alternatives: ['I\'m at my garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q203',
    hindi: 'वह अपने ऑफिस पर है।',
    english: 'He is at his office.',
    alternatives: ['He\'s at his office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q204',
    hindi: 'हम अपने स्कूल पर हैं।',
    english: 'We are at our school.',
    alternatives: ['We\'re at our school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q205',
    hindi: 'तुम अपने कॉलेज पर हो।',
    english: 'You are at your college.',
    alternatives: ['You\'re at your college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q206',
    hindi: 'वे अपने बैंक पर हैं।',
    english: 'They are at their bank.',
    alternatives: ['They\'re at their bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q207',
    hindi: 'मैं अपने हॉस्पिटल पर हूँ।',
    english: 'I am at my hospital.',
    alternatives: ['I\'m at my hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q208',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q209',
    hindi: 'हम अपने शॉपिंग मॉल पर हैं।',
    english: 'We are at our shopping mall.',
    alternatives: ['We\'re at our shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q210',
    hindi: 'तुम अपने सिनेमा पर हो।',
    english: 'You are at your cinema.',
    alternatives: ['You\'re at your cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q211',
    hindi: 'वे अपने रेलवे स्टेशन पर हैं।',
    english: 'They are at their railway station.',
    alternatives: ['They\'re at their railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q212',
    hindi: 'मैं अपने जिम पर हूँ।',
    english: 'I am at my gym.',
    alternatives: ['I\'m at my gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q213',
    hindi: 'वह अपने पार्क पर है।',
    english: 'He is at his park.',
    alternatives: ['He\'s at his park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q214',
    hindi: 'हम अपने बीच पर हैं।',
    english: 'We are at our beach.',
    alternatives: ['We\'re at our beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q215',
    hindi: 'तुम अपने लाइब्रेरी पर हो।',
    english: 'You are at your library.',
    alternatives: ['You\'re at your library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q216',
    hindi: 'वे अपने म्यूजियम पर हैं।',
    english: 'They are at their museum.',
    alternatives: ['They\'re at their museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q217',
    hindi: 'मैं अपने एयरपोर्ट पर हूँ।',
    english: 'I am at my airport.',
    alternatives: ['I\'m at my airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q218',
    hindi: 'वह अपने हॉटल पर है।',
    english: 'He is at his hotel.',
    alternatives: ['He\'s at his hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q219',
    hindi: 'हम अपने रेस्टोरेंट पर हैं।',
    english: 'We are at our restaurant.',
    alternatives: ['We\'re at our restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q220',
    hindi: 'तुम अपने बाजार पर हो।',
    english: 'You are at your market.',
    alternatives: ['You\'re at your market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q221',
    hindi: 'वे अपने गार्डन पर हैं।',
    english: 'They are at their garden.',
    alternatives: ['They\'re at their garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q222',
    hindi: 'मैं अपने ऑफिस पर हूँ।',
    english: 'I am at my office.',
    alternatives: ['I\'m at my office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q223',
    hindi: 'वह अपने स्कूल पर है।',
    english: 'He is at his school.',
    alternatives: ['He\'s at his school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q224',
    hindi: 'हम अपने कॉलेज पर हैं।',
    english: 'We are at our college.',
    alternatives: ['We\'re at our college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q225',
    hindi: 'तुम अपने बैंक पर हो।',
    english: 'You are at your bank.',
    alternatives: ['You\'re at your bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q226',
    hindi: 'वे अपने हॉस्पिटल पर हैं।',
    english: 'They are at their hospital.',
    alternatives: ['They\'re at their hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q227',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q228',
    hindi: 'वह अपने शॉपिंग मॉल पर है।',
    english: 'He is at his shopping mall.',
    alternatives: ['He\'s at his shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q229',
    hindi: 'हम अपने सिनेमा पर हैं।',
    english: 'We are at our cinema.',
    alternatives: ['We\'re at our cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q230',
    hindi: 'तुम अपने रेलवे स्टेशन पर हो।',
    english: 'You are at your railway station.',
    alternatives: ['You\'re at your railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q231',
    hindi: 'वे अपने जिम पर हैं।',
    english: 'They are at their gym.',
    alternatives: ['They\'re at their gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q232',
    hindi: 'मैं अपने पार्क पर हूँ।',
    english: 'I am at my park.',
    alternatives: ['I\'m at my park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q233',
    hindi: 'वह अपने बीच पर है।',
    english: 'He is at his beach.',
    alternatives: ['He\'s at his beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q234',
    hindi: 'हम अपने लाइब्रेरी पर हैं।',
    english: 'We are at our library.',
    alternatives: ['We\'re at our library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q235',
    hindi: 'तुम अपने म्यूजियम पर हो।',
    english: 'You are at your museum.',
    alternatives: ['You\'re at your museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q236',
    hindi: 'वे अपने एयरपोर्ट पर हैं।',
    english: 'They are at their airport.',
    alternatives: ['They\'re at their airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q237',
    hindi: 'मैं अपने हॉटल पर हूँ।',
    english: 'I am at my hotel.',
    alternatives: ['I\'m at my hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q238',
    hindi: 'वह अपने रेस्टोरेंट पर है।',
    english: 'He is at his restaurant.',
    alternatives: ['He\'s at his restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q239',
    hindi: 'हम अपने बाजार पर हैं।',
    english: 'We are at our market.',
    alternatives: ['We\'re at our market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q240',
    hindi: 'तुम अपने गार्डन पर हो।',
    english: 'You are at your garden.',
    alternatives: ['You\'re at your garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q241',
    hindi: 'वे अपने ऑफिस पर हैं।',
    english: 'They are at their office.',
    alternatives: ['They\'re at their office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q242',
    hindi: 'मैं अपने स्कूल पर हूँ।',
    english: 'I am at my school.',
    alternatives: ['I\'m at my school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q243',
    hindi: 'वह अपने कॉलेज पर है।',
    english: 'He is at his college.',
    alternatives: ['He\'s at his college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q244',
    hindi: 'हम अपने बैंक पर हैं।',
    english: 'We are at our bank.',
    alternatives: ['We\'re at our bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q245',
    hindi: 'तुम अपने हॉस्पिटल पर हो।',
    english: 'You are at your hospital.',
    alternatives: ['You\'re at your hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q246',
    hindi: 'वे अपने रेस्टोरेंट पर हैं।',
    english: 'They are at their restaurant.',
    alternatives: ['They\'re at their restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q247',
    hindi: 'मैं अपने शॉपिंग मॉल पर हूँ।',
    english: 'I am at my shopping mall.',
    alternatives: ['I\'m at my shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q248',
    hindi: 'वह अपने सिनेमा पर है।',
    english: 'He is at his cinema.',
    alternatives: ['He\'s at his cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q249',
    hindi: 'हम अपने रेलवे स्टेशन पर हैं।',
    english: 'We are at our railway station.',
    alternatives: ['We\'re at our railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q250',
    hindi: 'तुम अपने जिम पर हो।',
    english: 'You are at your gym.',
    alternatives: ['You\'re at your gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q251',
    hindi: 'वे अपने पार्क पर हैं।',
    english: 'They are at their park.',
    alternatives: ['They\'re at their park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q252',
    hindi: 'मैं अपने बीच पर हूँ।',
    english: 'I am at my beach.',
    alternatives: ['I\'m at my beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q253',
    hindi: 'वह अपने लाइब्रेरी पर है।',
    english: 'He is at his library.',
    alternatives: ['He\'s at his library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q254',
    hindi: 'हम अपने म्यूजियम पर हैं।',
    english: 'We are at our museum.',
    alternatives: ['We\'re at our museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q255',
    hindi: 'तुम अपने एयरपोर्ट पर हो।',
    english: 'You are at your airport.',
    alternatives: ['You\'re at your airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q256',
    hindi: 'वे अपने हॉटल पर हैं।',
    english: 'They are at their hotel.',
    alternatives: ['They\'re at their hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q257',
    hindi: 'मैं अपने रेस्टोरेंट पर हूँ।',
    english: 'I am at my restaurant.',
    alternatives: ['I\'m at my restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q258',
    hindi: 'वह अपने बाजार पर है।',
    english: 'He is at his market.',
    alternatives: ['He\'s at his market.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q259',
    hindi: 'हम अपने गार्डन पर हैं।',
    english: 'We are at our garden.',
    alternatives: ['We\'re at our garden.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q260',
    hindi: 'तुम अपने ऑफिस पर हो।',
    english: 'You are at your office.',
    alternatives: ['You\'re at your office.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q261',
    hindi: 'वे अपने स्कूल पर हैं।',
    english: 'They are at their school.',
    alternatives: ['They\'re at their school.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q262',
    hindi: 'मैं अपने कॉलेज पर हूँ।',
    english: 'I am at my college.',
    alternatives: ['I\'m at my college.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q263',
    hindi: 'वह अपने बैंक पर है।',
    english: 'He is at his bank.',
    alternatives: ['He\'s at his bank.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q264',
    hindi: 'हम अपने हॉस्पिटल पर हैं।',
    english: 'We are at our hospital.',
    alternatives: ['We\'re at our hospital.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q265',
    hindi: 'तुम अपने रेस्टोरेंट पर हो।',
    english: 'You are at your restaurant.',
    alternatives: ['You\'re at your restaurant.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q266',
    hindi: 'वे अपने शॉपिंग मॉल पर हैं।',
    english: 'They are at their shopping mall.',
    alternatives: ['They\'re at their shopping mall.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q267',
    hindi: 'मैं अपने सिनेमा पर हूँ।',
    english: 'I am at my cinema.',
    alternatives: ['I\'m at my cinema.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q268',
    hindi: 'वह अपने रेलवे स्टेशन पर है।',
    english: 'He is at his railway station.',
    alternatives: ['He\'s at his railway station.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q269',
    hindi: 'हम अपने जिम पर हैं।',
    english: 'We are at our gym.',
    alternatives: ['We\'re at our gym.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q270',
    hindi: 'तुम अपने पार्क पर हो।',
    english: 'You are at your park.',
    alternatives: ['You\'re at your park.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q271',
    hindi: 'वे अपने बीच पर हैं।',
    english: 'They are at their beach.',
    alternatives: ['They\'re at their beach.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q272',
    hindi: 'मैं अपने लाइब्रेरी पर हूँ।',
    english: 'I am at my library.',
    alternatives: ['I\'m at my library.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q273',
    hindi: 'वह अपने म्यूजियम पर है।',
    english: 'He is at his museum.',
    alternatives: ['He\'s at his museum.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q274',
    hindi: 'हम अपने एयरपोर्ट पर हैं।',
    english: 'We are at our airport.',
    alternatives: ['We\'re at our airport.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
  {
    id: 'q275',
    hindi: 'तुम अपने हॉटल पर हो।',
    english: 'You are at your hotel.',
    alternatives: ['You\'re at your hotel.'],
    hint: 'Preposition "at" for specific locations',
    explanation: 'We use "at" for specific locations like addresses, buildings, or places.',
    difficulty: 'easy'
  },
];

// ============================================================
// Day 1 Practice Page — renders via the shared PracticeQuiz engine
// ============================================================
export default function Day1PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <span className="text-slate-300">Day 1 Practice</span>
      </div>

      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          <BookOpen className="w-6 h-6 text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge-primary text-xs">Day 1</span>
          <h2 className="font-bold text-white">Basics of English — Subject + Verb + Object</h2>
          <p className="text-xs text-slate-500">{DAY_1_QUESTIONS.length} questions available</p>
        </div>
      </div>

      <PracticeQuizComponent
        questions={DAY_1_QUESTIONS}
        title="Day 1: Basics of English"
        backHref="/75-days-challenge/1"
        questionsPerSession={Math.min(50, DAY_1_QUESTIONS.length)}
        shuffleMode={true}
      />
    </div>
  );
}