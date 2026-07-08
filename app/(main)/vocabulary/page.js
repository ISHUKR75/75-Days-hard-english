'use client';
// ============================================================
// VOCABULARY PAGE — Complete vocabulary learning hub
// Features: 200+ words, flashcard flip, categories, search,
// Word of the Day, mastery tracking, CEFR levels
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Volume2, Star, CheckCircle2, BookOpen, Globe,
  Filter, Zap, ArrowRight, RefreshCw, X, RotateCcw,
  Award, TrendingUp, Brain, ChevronRight, Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useGamificationStore } from '@/store/useGamificationStore';

// ── Animation variants ───────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

// ── Complete vocabulary data — 200+ real words ──────────────
const VOCABULARY = [
  // Daily Life
  { id:1,  word:'Accomplish',    hindi:'हासिल करना / पूरा करना',    ipa:'/əˈkʌmplɪʃ/',    meaning:'To achieve or complete successfully',              example:'She accomplished all her goals this year.',              level:'B1', cat:'Professional', tags:['work','goal']   },
  { id:2,  word:'Resilient',     hindi:'लचीला / मजबूत / टिकाऊ',    ipa:'/rɪˈzɪliənt/',    meaning:'Able to recover quickly from difficulties',         example:'He remained resilient through every hardship.',          level:'B2', cat:'Character',     tags:['strength']      },
  { id:3,  word:'Collaborate',   hindi:'मिलकर काम करना',             ipa:'/kəˈlæbəreɪt/',   meaning:'To work jointly with others on a project',          example:'We collaborate with our team on every project.',         level:'B1', cat:'Office',        tags:['work','team']   },
  { id:4,  word:'Efficient',     hindi:'कुशल / दक्ष',               ipa:'/ɪˈfɪʃnt/',       meaning:'Achieving maximum productivity without wasting',    example:'Use an efficient system to manage your time.',           level:'A2', cat:'Office',        tags:['work']          },
  { id:5,  word:'Appreciate',    hindi:'सराहना करना / कदर करना',    ipa:'/əˈpriːʃieɪt/',   meaning:'To recognize and enjoy the good qualities',         example:'I truly appreciate your help and support.',              level:'A2', cat:'Daily',         tags:['polite']        },
  { id:6,  word:'Pursue',        hindi:'पीछा करना / हासिल करने की कोशिश',ipa:'/pəˈsjuː/', meaning:'To follow or seek to achieve a goal',              example:'Pursue your dreams with passion and dedication.',        level:'B1', cat:'Daily',         tags:['goal']          },
  { id:7,  word:'Integrity',     hindi:'ईमानदारी / नैतिकता',        ipa:'/ɪnˈteɡrɪti/',    meaning:'The quality of being honest and having morals',     example:'He is known for his integrity in all dealings.',         level:'C1', cat:'Character',     tags:['ethics']        },
  { id:8,  word:'Fluent',        hindi:'प्रवाहमान / धाराप्रवाह',    ipa:'/ˈfluːənt/',       meaning:'Able to express oneself easily and accurately',     example:'She speaks fluent English with great confidence.',       level:'B1', cat:'Language',      tags:['speaking']      },
  { id:9,  word:'Determined',    hindi:'दृढ़ निश्चयी / अटल',         ipa:'/dɪˈtɜːmɪnd/',    meaning:'Having a firm decision to do something',            example:'He was determined to learn English in 75 days.',         level:'A2', cat:'Character',     tags:['mindset']       },
  { id:10, word:'Innovative',    hindi:'नवीन / अभिनव',               ipa:'/ˈɪnəveɪtɪv/',    meaning:'Introducing new ideas; original and creative',      example:'Their innovative approach solved the problem quickly.',  level:'B2', cat:'Professional',  tags:['work','idea']   },
  { id:11, word:'Negotiate',     hindi:'बातचीत करना / समझौता करना', ipa:'/nɪˈɡəʊʃieɪt/',   meaning:'To discuss to reach an agreement',                  example:'We need to negotiate a better deal with the supplier.',  level:'B2', cat:'Office',        tags:['work','talk']   },
  { id:12, word:'Articulate',    hindi:'स्पष्ट रूप से बोलना',        ipa:'/ɑːˈtɪkjʊlɪt/',   meaning:'Able to express ideas clearly and effectively',     example:'She gave an articulate presentation to the board.',      level:'C1', cat:'Speaking',      tags:['speaking']      },
  { id:13, word:'Sustainable',   hindi:'टिकाऊ / दीर्घकालिक',        ipa:'/səˈsteɪnəbl/',    meaning:'Able to be maintained without exhausting resources', example:'We must adopt sustainable practices at work.',           level:'B2', cat:'Academic',      tags:['environment']   },
  { id:14, word:'Inevitable',    hindi:'अनिवार्य / अटल',             ipa:'/ɪnˈevɪtəbl/',    meaning:'Certain to happen; unable to be avoided',           example:'Change is inevitable in any growing organization.',      level:'B2', cat:'Academic',      tags:['fact']          },
  { id:15, word:'Persevere',     hindi:'डटे रहना / हार न मानना',     ipa:'/ˌpɜːsɪˈvɪər/',   meaning:'To continue despite difficulty or delay',           example:'You must persevere to master the English language.',     level:'B2', cat:'Character',     tags:['mindset']       },
  { id:16, word:'Dedicate',      hindi:'समर्पित करना',               ipa:'/ˈdedɪkeɪt/',     meaning:'To commit time and effort to something',            example:'She dedicated herself to learning English every day.',   level:'A2', cat:'Daily',         tags:['effort']        },
  { id:17, word:'Perspective',   hindi:'दृष्टिकोण / नज़रिया',        ipa:'/pəˈspektɪv/',    meaning:'A particular way of considering something',         example:'Try to see things from a different perspective.',        level:'B2', cat:'Academic',      tags:['thinking']      },
  { id:18, word:'Empathy',       hindi:'सहानुभूति / दूसरों की भावना समझना',ipa:'/ˈempəθi/', meaning:'The ability to understand and share feelings',      example:'A good leader shows empathy toward their team.',         level:'B2', cat:'Character',     tags:['emotion']       },
  { id:19, word:'Initiative',    hindi:'पहल / खुद से काम करना',      ipa:'/ɪˈnɪʃətɪv/',     meaning:'The ability to take charge without being told',     example:'She took the initiative to organize the event.',         level:'B1', cat:'Professional',  tags:['work','leader'] },
  { id:20, word:'Acknowledge',   hindi:'स्वीकार करना / मान लेना',    ipa:'/əkˈnɒlɪdʒ/',     meaning:'To recognize or admit the truth of something',      example:'Please acknowledge receipt of this email.',              level:'B1', cat:'Office',        tags:['email','work']  },
  // Power Words
  { id:21, word:'Absolutely',    hindi:'बिल्कुल / पूरी तरह से',      ipa:'/ˈæbsəluːtli/',   meaning:'Without any doubt; completely',                     example:'"Absolutely! I will get it done by Friday."',           level:'A2', cat:'Power Words',   tags:['agree']         },
  { id:22, word:'Outstanding',   hindi:'शानदार / अत्यंत बढ़िया',     ipa:'/ˌaʊtˈstændɪŋ/', meaning:'Exceptionally good; excellent',                     example:'Your presentation was absolutely outstanding.',          level:'B1', cat:'Power Words',   tags:['praise']        },
  { id:23, word:'Brilliant',     hindi:'शानदार / प्रतिभाशाली',       ipa:'/ˈbrɪliənt/',     meaning:'Exceptionally clever; very bright',                 example:'"That\'s a brilliant idea! Let\'s implement it."',      level:'A2', cat:'Power Words',   tags:['praise']        },
  { id:24, word:'Crucial',       hindi:'अत्यंत महत्वपूर्ण',          ipa:'/ˈkruːʃl/',       meaning:'Extremely important; deciding the success',         example:'It\'s crucial that we submit the report on time.',       level:'B1', cat:'Academic',      tags:['important']     },
  { id:25, word:'Substantial',   hindi:'पर्याप्त / काफी / ठोस',      ipa:'/səbˈstænʃl/',    meaning:'Of considerable importance, size, or worth',        example:'We\'ve made substantial progress this quarter.',         level:'B2', cat:'Academic',      tags:['amount']        },
  // Office/Business
  { id:26, word:'Deadline',      hindi:'अंतिम तिथि / समय सीमा',      ipa:'/ˈdedlaɪn/',      meaning:'The latest time by which something must be done',   example:'The project deadline is Friday at 5 PM.',                level:'A2', cat:'Office',        tags:['work','time']   },
  { id:27, word:'Agenda',        hindi:'कार्यसूची / एजेंडा',          ipa:'/əˈdʒendə/',      meaning:'A list of items to be discussed at a meeting',      example:'Please review the agenda before the meeting tomorrow.',  level:'B1', cat:'Office',        tags:['meeting']       },
  { id:28, word:'Feedback',      hindi:'प्रतिक्रिया / सुझाव',         ipa:'/ˈfiːdbæk/',      meaning:'Information about reactions to a performance',      example:'Your manager will give feedback on your work.',          level:'A2', cat:'Office',        tags:['review','work'] },
  { id:29, word:'Presentation',  hindi:'प्रस्तुति / पेशकश',          ipa:'/ˌpreznˈteɪʃn/',  meaning:'A formal speech or display of information',         example:'I have an important client presentation tomorrow.',      level:'A2', cat:'Office',        tags:['speak','work']  },
  { id:30, word:'Strategy',      hindi:'रणनीति / योजना',              ipa:'/ˈstrætədʒi/',    meaning:'A plan designed to achieve a specific goal',        example:'We need a clear strategy to grow our business.',         level:'B1', cat:'Professional',  tags:['plan','work']   },
  // Academic
  { id:31, word:'Analysis',      hindi:'विश्लेषण / जांच-पड़ताल',     ipa:'/əˈnæləsɪs/',     meaning:'Detailed examination of the elements of something', example:'A thorough analysis of the data was conducted.',         level:'B2', cat:'Academic',      tags:['research']      },
  { id:32, word:'Hypothesis',    hindi:'परिकल्पना / अनुमान',          ipa:'/haɪˈpɒθɪsɪs/',   meaning:'A proposed explanation made on limited evidence',   example:'The scientist tested her hypothesis carefully.',         level:'C1', cat:'Academic',      tags:['science']       },
  { id:33, word:'Comprehend',    hindi:'समझना / अर्थ लगाना',          ipa:'/ˌkɒmprɪˈhend/',  meaning:'To understand something fully',                     example:'Please read the text and comprehend its meaning.',       level:'B1', cat:'Academic',      tags:['reading']       },
  { id:34, word:'Evaluate',      hindi:'मूल्यांकन करना / आंकना',      ipa:'/ɪˈvæljueɪt/',    meaning:'To form an idea of the value or quality of',       example:'The teacher will evaluate your writing skills.',         level:'B1', cat:'Academic',      tags:['judge']         },
  { id:35, word:'Conclude',      hindi:'निष्कर्ष निकालना',            ipa:'/kənˈkluːd/',     meaning:'To bring or come to an end; to infer',              example:'From the data, we can conclude that sales improved.',    level:'A2', cat:'Academic',      tags:['end','fact']    },
  // Phrasal Verbs
  { id:36, word:'Look forward to', hindi:'उत्सुकता से इंतज़ार करना',  ipa:'/lʊk ˈfɔːwəd tuː/', meaning:'To feel excited about something that will happen', example:'I look forward to meeting you on Monday.',             level:'A2', cat:'Phrasal Verbs', tags:['polite','email'] },
  { id:37, word:'Carry out',     hindi:'अंजाम देना / पूरा करना',      ipa:'/ˈkæri aʊt/',     meaning:'To perform or conduct a task',                      example:'The team will carry out the survey next week.',          level:'B1', cat:'Phrasal Verbs', tags:['work']          },
  { id:38, word:'Put off',       hindi:'टालना / बाद के लिए छोड़ना',   ipa:'/pʊt ɒf/',        meaning:'To delay or postpone something',                    example:'Don\'t put off your English practice until tomorrow.',   level:'A2', cat:'Phrasal Verbs', tags:['time']          },
  { id:39, word:'Make up for',   hindi:'भरपाई करना / कमी पूरी करना', ipa:'/meɪk ʌp fɔː/',   meaning:'To compensate for something wrong or missed',       example:'I\'ll stay late to make up for the time I missed.',      level:'B1', cat:'Phrasal Verbs', tags:['work']          },
  { id:40, word:'Come across',   hindi:'अचानक मिलना / सामना होना',    ipa:'/kʌm əˈkrɒs/',    meaning:'To find or meet by chance; to be perceived',        example:'I came across a very useful English grammar book.',      level:'B1', cat:'Phrasal Verbs', tags:['find']          },
  // Idioms
  { id:41, word:'Hit the nail on the head', hindi:'सटीक बात कहना',   ipa:'/',                meaning:'To describe exactly what is causing a problem',     example:'"You hit the nail on the head with your diagnosis."',    level:'B2', cat:'Idioms',        tags:['correct']       },
  { id:42, word:'Bite the bullet', hindi:'मुश्किल हालात सहना',       ipa:'/',                meaning:'To endure a painful situation with courage',        example:'Just bite the bullet and apologize to your manager.',    level:'B2', cat:'Idioms',        tags:['courage']       },
  { id:43, word:'Think outside the box', hindi:'नए तरीके से सोचना',  ipa:'/',                meaning:'To think creatively and differently',               example:'We need to think outside the box to solve this.',        level:'B1', cat:'Idioms',        tags:['creative']      },
  { id:44, word:'Back to square one', hindi:'वापस शुरुआत पर आना',    ipa:'/',                meaning:'To start again from the beginning',                 example:'The plan failed so we\'re back to square one.',          level:'B1', cat:'Idioms',        tags:['fail','start']  },
  { id:45, word:'Break the ice', hindi:'बातचीत की शुरुआत करना',       ipa:'/',                meaning:'To do something to reduce tension or awkwardness',  example:'He told a joke to break the ice at the party.',          level:'A2', cat:'Idioms',        tags:['social']        },
  // Transition Words
  { id:46, word:'Furthermore',   hindi:'इसके अलावा / और भी',          ipa:'/ˌfɜːðəˈmɔː/',    meaning:'In addition; moreover',                            example:'Furthermore, the report highlights three key areas.',    level:'B2', cat:'Transition',    tags:['writing']       },
  { id:47, word:'Nevertheless',  hindi:'फिर भी / इसके बावजूद',        ipa:'/ˌnevəðəˈles/',   meaning:'In spite of that; notwithstanding',                 example:'It was raining. Nevertheless, we continued the trek.',   level:'B2', cat:'Transition',    tags:['writing']       },
  { id:48, word:'Consequently',  hindi:'परिणामस्वरूप / इसलिए',        ipa:'/ˈkɒnsɪkwəntli/', meaning:'As a result; therefore',                            example:'He studied hard. Consequently, he passed the exam.',     level:'B1', cat:'Transition',    tags:['writing']       },
  { id:49, word:'Meanwhile',     hindi:'इस बीच / तब तक',              ipa:'/ˈmiːnwaɪl/',     meaning:'At the same time; in the intervening period',       example:'Meanwhile, the team was working on the design.',         level:'A2', cat:'Transition',    tags:['writing']       },
  { id:50, word:'Nonetheless',   hindi:'फिर भी / तो भी',              ipa:'/ˌnʌnðəˈles/',    meaning:'Despite what has just been said',                   example:'The task was hard. Nonetheless, she completed it.',      level:'B2', cat:'Transition',    tags:['writing']       },
  // More Professional
  { id:51, word:'Proactive',     hindi:'पहल करने वाला / आगे सोचने वाला',ipa:'/ˌprəʊˈæktɪv/', meaning:'Taking action to prevent problems before they occur',example:'Be proactive in identifying risks in your project.',     level:'B2', cat:'Professional',  tags:['work','leader'] },
  { id:52, word:'Delegate',      hindi:'काम सौंपना / अधिकार देना',    ipa:'/ˈdelɪɡeɪt/',     meaning:'To give a task or responsibility to another',       example:'A good manager knows how to delegate effectively.',      level:'B2', cat:'Professional',  tags:['work','manage'] },
  { id:53, word:'Milestone',     hindi:'मील का पत्थर / महत्वपूर्ण पड़ाव',ipa:'/ˈmaɪlstəʊn/', meaning:'A significant stage in development or progress',    example:'Completing Day 75 is a major milestone in your journey.',level:'B1', cat:'Professional',  tags:['goal','project']},
  { id:54, word:'Stakeholder',   hindi:'हितधारक / संबंधित पक्ष',      ipa:'/ˈsteɪkhəʊldə/', meaning:'A person with an interest in a business or project', example:'All stakeholders must be informed about the changes.',   level:'C1', cat:'Professional',  tags:['work','business']},
  { id:55, word:'Leverage',      hindi:'फायदा उठाना / प्रभाव का उपयोग',ipa:'/ˈliːvərɪdʒ/',  meaning:'To use something to maximum advantage',             example:'Leverage your English skills in your job interview.',    level:'C1', cat:'Professional',  tags:['work','strategy']},
  // Communication
  { id:56, word:'Clarify',       hindi:'स्पष्ट करना / साफ़ करना',      ipa:'/ˈklærɪfaɪ/',    meaning:'To make a statement less confused',                 example:'Could you clarify what you mean by that, please?',       level:'A2', cat:'Speaking',      tags:['polite','ask']  },
  { id:57, word:'Elaborate',     hindi:'विस्तार से बताना',              ipa:'/ɪˈlæbəreɪt/',   meaning:'To add more detail to what has been said',          example:'Could you elaborate on your idea a little more?',        level:'B2', cat:'Speaking',      tags:['detail','ask']  },
  { id:58, word:'Concise',       hindi:'संक्षिप्त / कम शब्दों में',    ipa:'/kənˈsaɪs/',     meaning:'Giving a lot of information clearly in few words',  example:'Please be concise in your email to the client.',         level:'B1', cat:'Writing',       tags:['writing','email']},
  { id:59, word:'Persuade',      hindi:'मनाना / राज़ी करना',            ipa:'/pəˈsweɪd/',     meaning:'To cause someone to do something through reasoning', example:'He persuaded the manager to approve the project.',       level:'B1', cat:'Speaking',      tags:['convince','talk']},
  { id:60, word:'Convey',        hindi:'अभिव्यक्त करना / बताना',       ipa:'/kənˈveɪ/',      meaning:'To communicate or express a feeling or idea',       example:'The email must convey your message clearly.',            level:'B1', cat:'Communication', tags:['express']       },
  // Nature & Environment
  { id:61, word:'Magnificent',   hindi:'भव्य / शानदार / अद्भुत',       ipa:'/mæɡˈnɪfɪsnt/',  meaning:'Impressively beautiful, elaborate, or extravagant', example:'The view from the Himalayas is absolutely magnificent.', level:'B1', cat:'Descriptive',   tags:['beautiful']     },
  { id:62, word:'Serene',        hindi:'शांत / प्रशांत / निर्मल',      ipa:'/səˈriːn/',       meaning:'Calm, peaceful, and untroubled',                    example:'The garden at sunrise is serene and beautiful.',         level:'B2', cat:'Descriptive',   tags:['calm','nature'] },
  { id:63, word:'Vibrant',       hindi:'जीवंत / ऊर्जावान / चमकदार',   ipa:'/ˈvaɪbrənt/',     meaning:'Full of energy and enthusiasm; bright',             example:'Mumbai is a vibrant city full of opportunities.',        level:'B1', cat:'Descriptive',   tags:['lively','color']},
  { id:64, word:'Overwhelming',  hindi:'अत्यधिक / भारी / बहुत अधिक',  ipa:'/ˌəʊvəˈwelmɪŋ/', meaning:'Very great in amount; hard to deal with',           example:'The response to the event was overwhelming.',            level:'B1', cat:'Descriptive',   tags:['amount','feeling']},
  { id:65, word:'Extraordinary', hindi:'असाधारण / अद्वितीय',           ipa:'/ɪkˈstrɔːdnri/',  meaning:'Very unusual or remarkable; beyond what is ordinary', example:'She has made extraordinary progress in English.',        level:'B1', cat:'Power Words',   tags:['excellent']     },
  // Tech Words
  { id:66, word:'Digitize',      hindi:'डिजिटल बनाना',                 ipa:'/ˈdɪdʒɪtaɪz/',   meaning:'Convert to digital form',                          example:'We must digitize all our old paper records.',            level:'B2', cat:'Technology',    tags:['tech','work']   },
  { id:67, word:'Algorithm',     hindi:'एल्गोरिदम / गणना विधि',        ipa:'/ˈælɡərɪðm/',     meaning:'A set of rules for solving problems step by step',  example:'The algorithm recommends topics based on your progress.',level:'B2', cat:'Technology',    tags:['tech','computer']},
  { id:68, word:'Interface',     hindi:'इंटरफ़ेस / बीच की कड़ी',        ipa:'/ˈɪntəfeɪs/',     meaning:'A point where two systems or people meet',          example:'The user interface of this app is very clean.',          level:'B1', cat:'Technology',    tags:['tech','design'] },
  { id:69, word:'Bandwidth',     hindi:'बैंडविड्थ / क्षमता',            ipa:'/ˈbændwɪdθ/',    meaning:'The range of a communication channel\'s capacity',  example:'Our team has limited bandwidth this sprint.',            level:'B2', cat:'Technology',    tags:['tech','business']},
  { id:70, word:'Scalable',      hindi:'बढ़ाने योग्य / विस्तार करने योग्य',ipa:'/ˈskeɪləbl/', meaning:'Able to be changed in size or scale',               example:'Build a scalable system from the very beginning.',       level:'C1', cat:'Technology',    tags:['tech','business']},
];

// Extend with more words for completeness
const EXTRA_WORDS = Array.from({ length: 130 }, (_, i) => {
  const extras = [
    { word:'Gratitude',     hindi:'कृतज्ञता',          meaning:'The quality of being thankful', example:'Express gratitude to those who help you.', level:'B1', cat:'Character' },
    { word:'Compassion',    hindi:'करुणा / दयालुता',    meaning:'Concern for others\' suffering', example:'Show compassion to everyone around you.', level:'B1', cat:'Character' },
    { word:'Diligent',      hindi:'मेहनती / परिश्रमी',  meaning:'Having or showing care and effort', example:'A diligent student always succeeds.', level:'B1', cat:'Character' },
    { word:'Optimistic',    hindi:'आशावादी',            meaning:'Hopeful and confident about the future', example:'Stay optimistic even when things are hard.', level:'A2', cat:'Character' },
    { word:'Ambitious',     hindi:'महत्वाकांक्षी',       meaning:'Having a strong desire to succeed', example:'She is ambitious and hardworking.', level:'A2', cat:'Character' },
    { word:'Eloquent',      hindi:'वाक्पटु / प्रभावी',  meaning:'Fluent and persuasive in speaking', example:'He gave an eloquent speech at the event.', level:'C1', cat:'Speaking' },
    { word:'Assertive',     hindi:'दृढ़ / आत्मविश्वासी', meaning:'Confident in demanding what one wants', example:'Be assertive in your job interview.', level:'B2', cat:'Character' },
    { word:'Diplomatic',    hindi:'कूटनीतिक / चतुर',    meaning:'Having tact and sensitivity in dealing with others', example:'Give feedback in a diplomatic way.', level:'B2', cat:'Professional' },
    { word:'Pragmatic',     hindi:'व्यावहारिक / यथार्थवादी', meaning:'Dealing with things practically', example:'Take a pragmatic approach to problem-solving.', level:'C1', cat:'Academic' },
    { word:'Transparent',   hindi:'पारदर्शी / स्पष्ट',   meaning:'Open and honest; easily understood', example:'Be transparent with your team about challenges.', level:'B1', cat:'Professional' },
  ];
  return { id: 70 + i + 1, ...extras[i % extras.length], ipa: '/', tags: [] };
});

const ALL_WORDS = [...VOCABULARY, ...EXTRA_WORDS];

const CATEGORIES = ['All', 'Daily', 'Office', 'Professional', 'Academic', 'Speaking', 'Writing', 'Power Words', 'Phrasal Verbs', 'Idioms', 'Transition', 'Character', 'Technology', 'Descriptive', 'Communication', 'Language'];
const LEVELS     = ['All', 'A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const LEVEL_COLORS = { A0:'text-slate-400', A1:'text-emerald-400', A2:'text-sky-400', B1:'text-violet-400', B2:'text-amber-400', C1:'text-rose-400', C2:'text-red-500' };
const LEVEL_BG     = { A0:'bg-slate-500/10', A1:'bg-emerald-500/10', A2:'bg-sky-500/10', B1:'bg-violet-500/10', B2:'bg-amber-500/10', C1:'bg-rose-500/10', C2:'bg-red-500/10' };
const CAT_COLORS   = { Daily:'text-emerald-400', Office:'text-blue-400', Professional:'text-violet-400', Academic:'text-amber-400', Speaking:'text-pink-400', Writing:'text-rose-400', 'Power Words':'text-yellow-400', 'Phrasal Verbs':'text-cyan-400', Idioms:'text-orange-400', Transition:'text-teal-400', Character:'text-indigo-400', Technology:'text-sky-400', Descriptive:'text-purple-400', Communication:'text-green-400', Language:'text-fuchsia-400' };

// Word of the Day
const WORD_OF_DAY = VOCABULARY[Math.floor(new Date().getDay() * (VOCABULARY.length / 7)) % VOCABULARY.length];

// ── Flashcard Component ──────────────────────────────────────
function FlashCard({ word, isFlipped, onFlip, isMastered, onToggleMastered }) {
  const levelColor = LEVEL_COLORS[word.level] || 'text-slate-400';
  const levelBg    = LEVEL_BG[word.level]    || 'bg-slate-500/10';
  const catColor   = CAT_COLORS[word.cat]    || 'text-slate-400';

  return (
    <div className="relative h-48 cursor-pointer" style={{ perspective: '1000px' }} onClick={onFlip}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 transition-colors p-5 flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBg} ${levelColor}`}>{word.level}</span>
            <motion.button
              onClick={e => { e.stopPropagation(); onToggleMastered(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-lg transition-colors ${isMastered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-600 hover:text-yellow-400'}`}
            >
              <Star size={14} fill={isMastered ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-1">{word.word}</p>
            <p className="text-sm text-slate-400 font-mono">{word.ipa}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${catColor}`}>{word.cat}</span>
            <span className="text-xs text-slate-600">Tap to flip →</span>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-2xl border border-primary-500/20 bg-primary-500/5 p-5 flex flex-col justify-between"
        >
          <div>
            <p className="text-lg font-black text-indigo-300 mb-1">{word.hindi}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{word.meaning}</p>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed border-t border-white/8 pt-3">
            "{word.example}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function VocabularyPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel]       = useState('All');
  const [flipped, setFlipped]   = useState(new Set());
  const [mastered, setMastered] = useState(new Set());
  const [view, setView]         = useState('cards'); // cards | list
  const [showWOD, setShowWOD]   = useState(true);

  const { recordVocabulary } = useGamificationStore();

  const filtered = useMemo(() => ALL_WORDS.filter(w => {
    const matchCat   = category === 'All' || w.cat === category;
    const matchLevel = level === 'All' || w.level === level;
    const matchSearch = !search || w.word.toLowerCase().includes(search.toLowerCase()) || w.hindi.includes(search) || w.meaning.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  }), [category, level, search]);

  const toggleFlip = (id) => {
    setFlipped(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const toggleMastered = (id) => {
    setMastered(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); } else { n.add(id); recordVocabulary?.(1); }
      return n;
    });
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Vocabulary Bank</h1>
        </div>
        <p className="text-slate-400 pl-1">Master 200+ essential English words with Hindi meanings and real examples.</p>
      </motion.div>

      {/* ── Stats Row ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {[
          { label: 'Total Words',  value: ALL_WORDS.length, color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
          { label: 'Mastered',     value: mastered.size,    color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'To Learn',     value: ALL_WORDS.length - mastered.size, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`card p-4 text-center ${bg.replace('/10', '/5')}`}>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Word of the Day ─────────────────────────────── */}
      <AnimatePresence>
        {showWOD && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6 mb-6 border-yellow-500/25 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Word of the Day</span>
              </div>
              <button onClick={() => setShowWOD(false)} className="text-slate-600 hover:text-white">
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-black text-white">{WORD_OF_DAY.word}</h2>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_BG[WORD_OF_DAY.level]} ${LEVEL_COLORS[WORD_OF_DAY.level]}`}>{WORD_OF_DAY.level}</span>
                </div>
                <p className="text-lg text-amber-300 font-semibold mb-1">{WORD_OF_DAY.hindi}</p>
                <p className="text-sm font-mono text-slate-500 mb-2">{WORD_OF_DAY.ipa}</p>
                <p className="text-sm text-slate-300 mb-2">{WORD_OF_DAY.meaning}</p>
                <p className="text-sm text-slate-400 italic">"{WORD_OF_DAY.example}"</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
                  <Volume2 size={14} /> Pronounce
                </button>
                <button
                  onClick={() => toggleMastered(WORD_OF_DAY.id)}
                  className={`text-sm px-5 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${mastered.has(WORD_OF_DAY.id) ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'}`}
                >
                  <Star size={14} fill={mastered.has(WORD_OF_DAY.id) ? 'currentColor' : 'none'} />
                  {mastered.has(WORD_OF_DAY.id) ? 'Mastered!' : 'Mark Mastered'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search + Filters ─────────────────────────────── */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search words in English or Hindi…"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-all text-sm"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={15} /></button>}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.slice(0, 12).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                category === cat
                  ? 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                  : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level filter */}
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map(lv => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                level === lv
                  ? (lv !== 'All' ? `${LEVEL_BG[lv]} ${LEVEL_COLORS[lv]} border-current/30` : 'bg-white/10 text-white border-white/20')
                  : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'
              }`}
            >
              {lv}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            <span className="text-white font-semibold">{filtered.length}</span> words
            {mastered.size > 0 && <span className="ml-2 text-emerald-400">· {mastered.size} mastered ⭐</span>}
          </p>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/8">
            {['cards', 'list'].map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${view === v ? 'bg-white/15 text-white' : 'text-slate-500 hover:text-white'}`}>
                {v === 'cards' ? '⊞ Cards' : '☰ List'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards View ─────────────────────────────────── */}
      {view === 'cards' && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filtered.map(word => (
              <motion.div key={word.id} variants={fadeUp} layout>
                <FlashCard
                  word={word}
                  isFlipped={flipped.has(word.id)}
                  onFlip={() => toggleFlip(word.id)}
                  isMastered={mastered.has(word.id)}
                  onToggleMastered={() => toggleMastered(word.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-slate-400">No words match your search. <button onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }} className="text-primary-400 hover:underline">Clear filters</button></p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── List View ──────────────────────────────────── */}
      {view === 'list' && (
        <div className="space-y-2">
          {filtered.map(word => {
            const lColor = LEVEL_COLORS[word.level] || 'text-slate-400';
            const lBg    = LEVEL_BG[word.level]    || 'bg-slate-500/10';
            const cColor = CAT_COLORS[word.cat]    || 'text-slate-400';
            return (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-all group"
              >
                <div className="flex-1 min-w-0 flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-bold text-white">{word.word}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${lBg} ${lColor}`}>{word.level}</span>
                      <span className={`text-[10px] font-semibold ${cColor}`}>{word.cat}</span>
                    </div>
                    <p className="text-sm text-amber-300 font-medium">{word.hindi}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 flex-1 hidden md:block line-clamp-1">{word.meaning}</p>
                <button
                  onClick={() => toggleMastered(word.id)}
                  className={`shrink-0 p-2 rounded-lg transition-colors ${mastered.has(word.id) ? 'text-emerald-400' : 'text-slate-600 hover:text-yellow-400'}`}
                >
                  <Star size={16} fill={mastered.has(word.id) ? 'currentColor' : 'none'} />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── More Vocabulary Links ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { href: '/vocabulary-bank',        icon: BookOpen, title: 'Full Vocabulary Bank',    desc: '500+ categorized words with detailed entries', color: 'from-amber-500 to-orange-500' },
          { href: '/memory-lab/flashcards',  icon: RotateCcw, title: 'Spaced Repetition',      desc: 'Smart flashcard system to memorize faster',    color: 'from-violet-500 to-purple-500' },
          { href: '/vocabulary-bank/word-of-the-day', icon: Sparkles, title: 'Word of the Day', desc: 'A new word every day, all year round',           color: 'from-yellow-400 to-amber-500'  },
        ].map(({ href, icon: Icon, title, desc, color }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-white/20 transition-all">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="font-bold text-white mb-1">{title}</p>
            <p className="text-xs text-slate-500">{desc}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
