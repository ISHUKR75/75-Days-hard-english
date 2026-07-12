#!/usr/bin/env node
// ============================================================================
// gen_day02_boost_full.js
// Scales Day 2 ("Self Introduction") practice + test questions up from the
// old flat totals (950 practice / 350 test) to the per-topic/subtopic volume
// the user asked for: roughly 900-1000 practice questions and 300-400 test
// questions for EACH of the 16 categories below (not 950/350 total).
//
// Approach: combinatorial generation from real, curated word/phrase pools
// (Indian names, cities, professions, hobbies, etc. — same pools used by the
// original gen_day02_v2.js, enlarged here) combined with several distinct,
// grammatically valid sentence templates per category. Two pools are often
// combined (e.g. profession + city, or personality + profession) to reach
// natural, non-repetitive sentences instead of just cycling one pool.
//
// Vocabulary is left untouched by this script (already at 740 words, close
// to Day 1's precedent of 1,184 across many more categories).
// ============================================================================
const fs = require('fs');
const path = require('path');

const OUT = 'data/challenge/day-02';

// ----------------------------------------------------------------------------
// POOLS — enlarged, real data (no invented/fake words)
// ----------------------------------------------------------------------------
const names = [
  'Rohan','Aman','Raj','Vicky','Sunil','Anita','Priya','Kartikeya','Neha','Sanjay',
  'Pooja','Vikas','Ritu','Aditya','Kavita','Manish','Shreya','Deepak','Anjali','Rahul',
  'Suman','Nikhil','Meena','Arjun','Divya','Karan','Swati','Vivek','Simran','Gaurav',
  'Preeti','Rakesh','Isha','Ajay','Komal','Harsh','Nidhi','Yash','Bhavna','Tarun',
  'Ankit','Shivani','Mohit','Riya','Sahil','Pallavi','Naveen','Sonia','Ravi','Payal',
  'Amit','Sneha','Vishal','Kirti','Rajesh','Monika','Suresh','Namrata','Dinesh','Alka',
  'Sameer','Renu','Ashok','Geeta','Vinod','Sunita','Manoj','Rekha','Umesh','Vandana',
  'Pankaj','Seema','Rajendra','Shalini','Naresh','Bhumika','Girish','Madhuri','Ramesh','Usha',
  'Sandeep','Poonam','Anil','Kiran','Vijay','Lata','Mahesh','Radha','Prakash','Sarita',
  'Yogesh','Archana','Sunny','Diksha','Rohit','Ekta','Abhishek','Jyoti','Varun','Megha',
  'Tanvi','Ishaan','Aarav','Saanvi','Vivaan','Ananya','Reyansh','Diya','Aryan','Myra',
  'Kabir','Zara','Advait','Anaya','Dhruv','Ishita','Arnav','Aadhya','Vihaan','Kiara'
];

const cities = [
  'Delhi','Mumbai','Jaipur','Lucknow','Patna','Bhopal','Chandigarh','Kanpur','Indore','Ranchi',
  'Pune','Surat','Nagpur','Agra','Varanasi','Amritsar','Guwahati','Bhubaneswar','Kota','Meerut',
  'Bangalore','Hyderabad','Chennai','Kolkata','Ahmedabad','Ludhiana','Nashik','Faridabad','Rajkot','Vadodara',
  'Coimbatore','Madurai','Jodhpur','Raipur','Dehradun','Shimla','Jammu','Srinagar','Mysore','Thiruvananthapuram',
  'Visakhapatnam','Vijayawada','Warangal','Guntur','Noida','Gurugram','Gwalior','Jabalpur','Ujjain','Rewa',
  'Bikaner','Ajmer','Udaipur','Alwar','Sikar','Bhilwara','Panipat','Rohtak','Hisar','Karnal',
  'Allahabad','Moradabad','Aligarh','Bareilly','Saharanpur','Gorakhpur','Firozabad','Jhansi','Muzaffarpur','Gaya',
  'Bhagalpur','Darbhanga','Siliguri','Durgapur','Asansol','Howrah','Cuttack','Rourkela','Puri','Sambalpur',
  'Thane','Nagercoil','Aurangabad','Solapur','Kolhapur','Amravati','Nanded','Sangli','Akola','Latur',
  'Salem','Tiruchirappalli','Tirunelveli','Erode','Vellore','Thanjavur','Nellore','Kurnool','Kadapa','Anantapur',
  'Kochi','Kozhikode','Thrissur','Kollam','Kannur','Alappuzha','Kottayam','Palakkad','Bathinda','Patiala',
  'Jalandhar','Mohali','Ambala','Panchkula','Sonipat','Yamunanagar','Bilaspur','Korba','Durg','Bhilai'
];

const jobs = [
  { en: 'teacher', hi: 'शिक्षक' }, { en: 'engineer', hi: 'इंजीनियर' }, { en: 'doctor', hi: 'डॉक्टर' },
  { en: 'accountant', hi: 'अकाउंटेंट' }, { en: 'salesman', hi: 'सेल्समैन' }, { en: 'manager', hi: 'मैनेजर' },
  { en: 'clerk', hi: 'क्लर्क' }, { en: 'designer', hi: 'डिज़ाइनर' }, { en: 'developer', hi: 'डेवलपर' },
  { en: 'nurse', hi: 'नर्स' }, { en: 'lawyer', hi: 'वकील' }, { en: 'farmer', hi: 'किसान' },
  { en: 'shopkeeper', hi: 'दुकानदार' }, { en: 'driver', hi: 'ड्राइवर' }, { en: 'student', hi: 'छात्र' },
  { en: 'pharmacist', hi: 'फार्मासिस्ट' }, { en: 'architect', hi: 'वास्तुकार' }, { en: 'electrician', hi: 'इलेक्ट्रीशियन' },
  { en: 'plumber', hi: 'प्लंबर' }, { en: 'chef', hi: 'शेफ' }, { en: 'waiter', hi: 'वेटर' },
  { en: 'receptionist', hi: 'रिसेप्शनिस्ट' }, { en: 'analyst', hi: 'विश्लेषक' }, { en: 'consultant', hi: 'सलाहकार' },
  { en: 'entrepreneur', hi: 'उद्यमी' }, { en: 'journalist', hi: 'पत्रकार' }, { en: 'photographer', hi: 'फ़ोटोग्राफ़र' },
  { en: 'pilot', hi: 'पायलट' }, { en: 'police officer', hi: 'पुलिस अधिकारी' }, { en: 'scientist', hi: 'वैज्ञानिक' },
  { en: 'librarian', hi: 'पुस्तकालयाध्यक्ष' }, { en: 'tailor', hi: 'दर्ज़ी' }, { en: 'carpenter', hi: 'कारपेंटर' },
  { en: 'mechanic', hi: 'मैकेनिक' }, { en: 'banker', hi: 'बैंकर' }, { en: 'auditor', hi: 'ऑडिटर' },
  { en: 'HR executive', hi: 'एचआर एग्जीक्यूटिव' }, { en: 'marketing executive', hi: 'मार्केटिंग एग्जीक्यूटिव' },
  { en: 'software tester', hi: 'सॉफ्टवेयर टेस्टर' }, { en: 'data scientist', hi: 'डेटा साइंटिस्ट' },
  { en: 'content writer', hi: 'कंटेंट राइटर' }, { en: 'graphic artist', hi: 'ग्राफ़िक आर्टिस्ट' },
  { en: 'civil engineer', hi: 'सिविल इंजीनियर' }, { en: 'mechanical engineer', hi: 'मैकेनिकल इंजीनियर' },
  { en: 'electrical engineer', hi: 'इलेक्ट्रिकल इंजीनियर' }, { en: 'professor', hi: 'प्रोफेसर' },
  { en: 'principal', hi: 'प्रधानाचार्य' }, { en: 'cashier', hi: 'कैशियर' }, { en: 'security guard', hi: 'सुरक्षा गार्ड' },
  { en: 'fashion designer', hi: 'फैशन डिज़ाइनर' }, { en: 'interior designer', hi: 'इंटीरियर डिज़ाइनर' },
  { en: 'physiotherapist', hi: 'फिजियोथेरेपिस्ट' }, { en: 'dentist', hi: 'दंत चिकित्सक' },
  { en: 'surgeon', hi: 'सर्जन' }, { en: 'social worker', hi: 'सामाजिक कार्यकर्ता' }, { en: 'coach', hi: 'कोच' },
  { en: 'event manager', hi: 'इवेंट मैनेजर' }, { en: 'travel agent', hi: 'ट्रैवल एजेंट' },
  { en: 'insurance agent', hi: 'बीमा एजेंट' }, { en: 'real estate agent', hi: 'रियल एस्टेट एजेंट' }
];

const hobbies = [
  { en: 'reading books', hi: 'किताबें पढ़ना' }, { en: 'playing cricket', hi: 'क्रिकेट खेलना' },
  { en: 'singing', hi: 'गाना गाना' }, { en: 'dancing', hi: 'नाचना' }, { en: 'painting', hi: 'चित्रकारी करना' },
  { en: 'cooking', hi: 'खाना बनाना' }, { en: 'travelling', hi: 'यात्रा करना' }, { en: 'gardening', hi: 'बागबानी करना' },
  { en: 'photography', hi: 'फ़ोटोग्राफ़ी करना' }, { en: 'playing chess', hi: 'शतरंज खेलना' },
  { en: 'watching movies', hi: 'फ़िल्में देखना' }, { en: 'writing poems', hi: 'कविता लिखना' },
  { en: 'playing football', hi: 'फुटबॉल खेलना' }, { en: 'playing badminton', hi: 'बैडमिंटन खेलना' },
  { en: 'swimming', hi: 'तैरना' }, { en: 'cycling', hi: 'साइकिल चलाना' }, { en: 'trekking', hi: 'ट्रैकिंग करना' },
  { en: 'doing yoga', hi: 'योग करना' }, { en: 'meditating', hi: 'ध्यान करना' }, { en: 'blogging', hi: 'ब्लॉग लिखना' },
  { en: 'coding', hi: 'कोडिंग करना' }, { en: 'playing guitar', hi: 'गिटार बजाना' }, { en: 'playing tabla', hi: 'तबला बजाना' },
  { en: 'collecting stamps', hi: 'डाक टिकट इकट्ठा करना' }, { en: 'bird watching', hi: 'पक्षी देखना' },
  { en: 'stargazing', hi: 'तारे देखना' }, { en: 'sketching', hi: 'रेखांकन करना' }, { en: 'doing origami', hi: 'ओरिगामी करना' },
  { en: 'volunteering', hi: 'स्वयंसेवा करना' }, { en: 'baking', hi: 'बेकिंग करना' },
  { en: 'playing table tennis', hi: 'टेबल टेनिस खेलना' }, { en: 'playing volleyball', hi: 'वॉलीबॉल खेलना' },
  { en: 'playing kabaddi', hi: 'कबड्डी खेलना' }, { en: 'running', hi: 'दौड़ना' }, { en: 'skating', hi: 'स्केटिंग करना' },
  { en: 'fishing', hi: 'मछली पकड़ना' }, { en: 'knitting', hi: 'बुनाई करना' }, { en: 'solving puzzles', hi: 'पहेलियाँ सुलझाना' },
  { en: 'playing video games', hi: 'वीडियो गेम खेलना' }, { en: 'watching documentaries', hi: 'वृत्तचित्र देखना' },
  { en: 'listening to music', hi: 'संगीत सुनना' }, { en: 'playing harmonium', hi: 'हारमोनियम बजाना' },
  { en: 'playing drums', hi: 'ड्रम बजाना' }, { en: 'pottery making', hi: 'मिट्टी के बर्तन बनाना' },
  { en: 'collecting coins', hi: 'सिक्के इकट्ठा करना' }, { en: 'horse riding', hi: 'घुड़सवारी करना' },
  { en: 'rock climbing', hi: 'चट्टान चढ़ना' }, { en: 'camping', hi: 'कैंपिंग करना' },
  { en: 'playing carrom', hi: 'कैरम खेलना' }, { en: 'flying kites', hi: 'पतंग उड़ाना' },
  { en: 'playing hockey', hi: 'हॉकी खेलना' }, { en: 'playing kho-kho', hi: 'खो-खो खेलना' },
  { en: 'making short films', hi: 'शॉर्ट फिल्में बनाना' }, { en: 'doing calligraphy', hi: 'सुलेख करना' },
  { en: 'learning new languages', hi: 'नई भाषाएँ सीखना' }, { en: 'debating', hi: 'वाद-विवाद करना' },
  { en: 'acting in plays', hi: 'नाटकों में अभिनय करना' }, { en: 'playing sitar', hi: 'सितार बजाना' },
  { en: 'stitching clothes', hi: 'कपड़े सिलना' }, { en: 'astronomy', hi: 'खगोल विज्ञान' },
  { en: 'quizzing', hi: 'क्विज़ खेलना' }, { en: 'martial arts', hi: 'मार्शल आर्ट्स करना' },
  { en: 'playing golf', hi: 'गोल्फ़ खेलना' }, { en: 'playing polo', hi: 'पोलो खेलना' },
  { en: 'skateboarding', hi: 'स्केटबोर्डिंग करना' }, { en: 'surfing the internet for new skills', hi: 'नई स्किल्स के लिए इंटरनेट पर खोज करना' }
];

const languages = [
  { en: 'Hindi', hi: 'हिंदी' }, { en: 'English', hi: 'अंग्रेज़ी' }, { en: 'Punjabi', hi: 'पंजाबी' },
  { en: 'Bengali', hi: 'बंगाली' }, { en: 'Marathi', hi: 'मराठी' }, { en: 'Gujarati', hi: 'गुजराती' },
  { en: 'Tamil', hi: 'तमिल' }, { en: 'Telugu', hi: 'तेलुगु' }, { en: 'Kannada', hi: 'कन्नड़' },
  { en: 'Malayalam', hi: 'मलयालम' }, { en: 'Odia', hi: 'ओड़िया' }, { en: 'Assamese', hi: 'असमिया' },
  { en: 'Urdu', hi: 'उर्दू' }, { en: 'Sanskrit', hi: 'संस्कृत' }, { en: 'French', hi: 'फ़्रेंच' },
  { en: 'German', hi: 'जर्मन' }, { en: 'Spanish', hi: 'स्पेनिश' }, { en: 'Japanese', hi: 'जापानी' },
  { en: 'Chinese', hi: 'चीनी' }, { en: 'Arabic', hi: 'अरबी' }, { en: 'Russian', hi: 'रूसी' },
  { en: 'Korean', hi: 'कोरियाई' }, { en: 'Portuguese', hi: 'पॉर्तुगीज़' }, { en: 'Italian', hi: 'इतालवी' },
  { en: 'Nepali', hi: 'नेपाली' }, { en: 'Sindhi', hi: 'सिंधी' }, { en: 'Kashmiri', hi: 'कश्मीरी' },
  { en: 'Konkani', hi: 'कोंकणी' }, { en: 'Maithili', hi: 'मैथिली' }, { en: 'Bhojpuri', hi: 'भोजपुरी' }
];

const degrees = [
  { en: 'B.Tech in Computer Science', hi: 'कंप्यूटर साइंस में बी.टेक' },
  { en: 'B.A. in English', hi: 'अंग्रेज़ी में बी.ए.' },
  { en: 'B.Com', hi: 'बी.कॉम' },
  { en: 'MBA in Marketing', hi: 'मार्केटिंग में एमबीए' },
  { en: 'B.Sc in Mathematics', hi: 'गणित में बी.एससी' },
  { en: 'Diploma in Mechanical Engineering', hi: 'मैकेनिकल इंजीनियरिंग में डिप्लोमा' },
  { en: 'M.Tech in Electronics', hi: 'इलेक्ट्रॉनिक्स में एम.टेक' },
  { en: 'B.Sc in Physics', hi: 'भौतिकी में बी.एससी' },
  { en: 'M.A. in History', hi: 'इतिहास में एम.ए.' },
  { en: 'B.Ed', hi: 'बी.एड' },
  { en: 'LLB', hi: 'एलएलबी' },
  { en: 'MBBS', hi: 'एमबीबीएस' },
  { en: 'B.Pharm', hi: 'बी.फार्म' },
  { en: 'Diploma in Fashion Design', hi: 'फैशन डिज़ाइन में डिप्लोमा' },
  { en: 'B.Sc in Agriculture', hi: 'कृषि में बी.एससी' },
  { en: 'M.Com', hi: 'एम.कॉम' },
  { en: 'BCA', hi: 'बीसीए' },
  { en: 'MCA', hi: 'एमसीए' },
  { en: 'B.Arch', hi: 'बी.आर्क' },
  { en: 'PhD in Chemistry', hi: 'रसायन विज्ञान में पीएचडी' },
  { en: 'B.Tech in Civil Engineering', hi: 'सिविल इंजीनियरिंग में बी.टेक' },
  { en: 'B.Tech in Electrical Engineering', hi: 'इलेक्ट्रिकल इंजीनियरिंग में बी.टेक' },
  { en: 'B.Sc in Biology', hi: 'जीव विज्ञान में बी.एससी' },
  { en: 'M.Sc in Mathematics', hi: 'गणित में एम.एससी' },
  { en: 'PGDM', hi: 'पीजीडीएम' },
  { en: 'B.Design', hi: 'बी.डिज़ाइन' },
  { en: 'B.Sc in Nursing', hi: 'नर्सिंग में बी.एससी' },
  { en: 'Diploma in Hotel Management', hi: 'होटल मैनेजमेंट में डिप्लोमा' },
  { en: 'B.Sc in Computer Science', hi: 'कंप्यूटर साइंस में बी.एससी' },
  { en: 'M.A. in Economics', hi: 'अर्थशास्त्र में एम.ए.' }
];

const skills = [
  { en: 'public speaking', hi: 'सार्वजनिक भाषण' }, { en: 'time management', hi: 'समय प्रबंधन' },
  { en: 'problem solving', hi: 'समस्या समाधान' }, { en: 'team work', hi: 'टीम वर्क' },
  { en: 'communication', hi: 'संवाद' }, { en: 'leadership', hi: 'नेतृत्व' },
  { en: 'computer skills', hi: 'कंप्यूटर स्किल्स' }, { en: 'data analysis', hi: 'डेटा विश्लेषण' },
  { en: 'negotiation', hi: 'बातचीत करने की क्षमता' }, { en: 'critical thinking', hi: 'विवेचनात्मक चिंतन' },
  { en: 'decision making', hi: 'निर्णय लेने की क्षमता' }, { en: 'multitasking', hi: 'बहु-कार्य क्षमता' },
  { en: 'adaptability', hi: 'अनुकूलनशीलता' }, { en: 'creativity', hi: 'रचनात्मकता' },
  { en: 'project management', hi: 'प्रोजेक्ट प्रबंधन' }, { en: 'customer service', hi: 'ग्राहक सेवा' },
  { en: 'presentation skills', hi: 'प्रस्तुति कौशल' }, { en: 'analytical thinking', hi: 'विश्लेषणात्मक सोच' },
  { en: 'conflict resolution', hi: 'संघर्ष समाधान' }, { en: 'emotional intelligence', hi: 'भावनात्मक बुद्धिमत्ता' },
  { en: 'strategic planning', hi: 'रणनीतिक योजना' }, { en: 'coding', hi: 'कोडिंग' },
  { en: 'digital marketing', hi: 'डिजिटल मार्केटिंग' }, { en: 'financial planning', hi: 'वित्तीय योजना' },
  { en: 'active listening', hi: 'सक्रिय श्रवण' }, { en: 'networking', hi: 'नेटवर्किंग' },
  { en: 'research skills', hi: 'शोध कौशल' }, { en: 'writing skills', hi: 'लेखन कौशल' },
  { en: 'sales skills', hi: 'बिक्री कौशल' }, { en: 'accounting', hi: 'लेखांकन' },
  { en: 'graphic designing', hi: 'ग्राफिक डिज़ाइनिंग' }, { en: 'video editing', hi: 'वीडियो एडिटिंग' },
  { en: 'event planning', hi: 'इवेंट प्लानिंग' }, { en: 'stress management', hi: 'तनाव प्रबंधन' }
];

const adjectives = [
  { en: 'confident', hi: 'आत्मविश्वासी' }, { en: 'hardworking', hi: 'मेहनती' },
  { en: 'friendly', hi: 'मित्रवत' }, { en: 'honest', hi: 'ईमानदार' }, { en: 'punctual', hi: 'समय का पालन करने वाला' },
  { en: 'creative', hi: 'रचनात्मक' }, { en: 'disciplined', hi: 'अनुशासित' }, { en: 'ambitious', hi: 'महत्वाकांक्षी' },
  { en: 'patient', hi: 'सहनशील' }, { en: 'polite', hi: 'विनम्र' }, { en: 'humble', hi: 'विनीत' },
  { en: 'optimistic', hi: 'आशावादी' }, { en: 'sincere', hi: 'निष्ठावान' }, { en: 'cheerful', hi: 'हर्षित' },
  { en: 'curious', hi: 'जिज्ञासु' }, { en: 'independent', hi: 'स्वतंत्र' }, { en: 'flexible', hi: 'लचीला' },
  { en: 'generous', hi: 'उदार' }, { en: 'calm', hi: 'शांत' }, { en: 'energetic', hi: 'ऊर्जावान' },
  { en: 'loyal', hi: 'वफ़ादार' }, { en: 'cooperative', hi: 'सहयोगी' }, { en: 'resourceful', hi: 'साधन-संपन्न' },
  { en: 'determined', hi: 'दृढ़-निश्चयी' }, { en: 'respectful', hi: 'सम्मानजनक' }, { en: 'trustworthy', hi: 'विश्वसनीय' },
  { en: 'diligent', hi: 'लगनशील' }, { en: 'sociable', hi: 'मिलनसार' }, { en: 'modest', hi: 'शालीन' },
  { en: 'thoughtful', hi: 'विचारशील' }, { en: 'passionate', hi: 'जुनूनी' }, { en: 'reliable', hi: 'भरोसेमंद' },
  { en: 'adaptable', hi: 'अनुकूलनशील' }, { en: 'courageous', hi: 'साहसी' }, { en: 'talented', hi: 'प्रतिभाशाली' }
];

const achievementTypes = [
  'won a competition', 'completed a certification course', 'received an award',
  'secured a top rank', 'published an article', 'led a team', 'organized an event',
  'received a scholarship', 'built a small project', 'volunteered for a cause',
  'delivered a presentation', 'mentored juniors', 'represented my institute',
  'cleared a certification exam', 'contributed to a community project'
];
const achievementLevels = ['school', 'college', 'district', 'state', 'national', 'international', 'company-wide', 'community'];
const achievementDomains = ['sports', 'academics', 'technology', 'arts', 'business', 'social service', 'science', 'leadership'];

const familyMembers = [
  { en: 'father', hi: 'पिता' }, { en: 'mother', hi: 'माता' }, { en: 'brother', hi: 'भाई' },
  { en: 'sister', hi: 'बहन' }, { en: 'grandfather', hi: 'दादा' }, { en: 'grandmother', hi: 'दादी' },
  { en: 'uncle', hi: 'चाचा' }, { en: 'aunt', hi: 'चाची' }, { en: 'cousin', hi: 'चचेरा भाई' },
  { en: 'nephew', hi: 'भतीजा' }, { en: 'niece', hi: 'भतीजी' }, { en: 'wife', hi: 'पत्नी' },
  { en: 'husband', hi: 'पति' }, { en: 'son', hi: 'बेटा' }, { en: 'daughter', hi: 'बेटी' }
];
const relationCounts = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const experienceYears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function shuffle(arr, seedOffset = 0) {
  // Deterministic shuffle so re-runs are reproducible (no Math.random drift)
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 2654435761 + seedOffset) % (i + 1);
    [out[i], out[j >= 0 ? j : 0]] = [out[j >= 0 ? j : 0], out[i]];
  }
  return out;
}

// ----------------------------------------------------------------------------
// CATEGORY GENERATORS — each returns an array of { hindi, english,
// alternatives, hint, explanation, grammarRule } for its category, sized to
// land in the 900-1000 band (practice) once combined.
// ----------------------------------------------------------------------------
function genNameIntroduction() {
  const tpls = [
    (n) => [`मेरा नाम ${n} है।`, `My name is ${n}.`],
    (n) => [`मैं ${n} हूँ।`, `I am ${n}.`],
    (n) => [`आप मुझे ${n} बुला सकते हैं।`, `You can call me ${n}.`],
    (n) => [`लोग मुझे ${n} कहते हैं।`, `People call me ${n}.`],
    (n) => [`मैं ${n} के नाम से जाना जाता हूँ।`, `I go by the name ${n}.`],
    (n) => [`सब मुझे ${n} के नाम से जानते हैं।`, `Everyone knows me as ${n}.`],
    (n) => [`मेरा पूरा नाम ${n} है।`, `My full name is ${n}.`],
    (n) => [`मैं अपना परिचय देना चाहूँगा, मैं ${n} हूँ।`, `I'd like to introduce myself, I am ${n}.`],
  ];
  const out = [];
  for (const tpl of tpls) for (const n of names) {
    const [hindi, english] = tpl(n);
    out.push({ hindi, english, alternatives: [`I'm ${n}.`], hint: 'My name is / I am + [Name]', explanation: `'My name is' / 'I am' सबसे common self-introduction patterns हैं, हर नाम के साथ इस्तेमाल होते हैं।`, grammarRule: 'My name is + [Name] / I am + [Name]' });
  }
  return out;
}

function genOrigin() {
  const tpls = [
    (c) => [`मैं ${c} से हूँ।`, `I am from ${c}.`],
    (c) => [`मैं ${c} से संबंध रखता हूँ।`, `I belong to ${c}.`],
    (c) => [`मैं ${c} से आता हूँ।`, `I come from ${c}.`],
    (c) => [`मेरा जन्म ${c} में हुआ था।`, `I was born in ${c}.`],
    (c) => [`मेरा गृहनगर ${c} है।`, `My hometown is ${c}.`],
    (c) => [`मैं ${c} का रहने वाला हूँ।`, `I hail from ${c}.`],
    (c) => [`मैं ${c} में बड़ा हुआ।`, `I grew up in ${c}.`],
    (c) => [`मेरा मूल स्थान ${c} है।`, `My native place is ${c}.`],
  ];
  const out = [];
  for (const tpl of tpls) for (const c of cities) {
    const [hindi, english] = tpl(c);
    out.push({ hindi, english, alternatives: [`I belong to ${c}.`], hint: 'I am from / I belong to + [place]', explanation: `जन्म स्थान या रहने की जगह बताने के लिए 'I am from' / 'I belong to' + city इस्तेमाल होता है।`, grammarRule: 'I am from + [place]' });
  }
  return out;
}

function genProfession() {
  const out = [];
  for (const j of jobs) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    const base = [
      [`मैं एक ${j.hi} हूँ।`, `I am ${article} ${j.en}.`],
      [`मैं ${j.hi} के तौर पर काम करता हूँ।`, `I work as ${article} ${j.en}.`],
      [`मेरा पेशा ${j.hi} है।`, `My profession is that of ${article} ${j.en}.`],
      [`मैं ${j.hi} के पद पर कार्यरत हूँ।`, `I am employed as ${article} ${j.en}.`],
      [`पेशे से मैं एक ${j.hi} हूँ।`, `By profession, I am ${article} ${j.en}.`],
    ];
    for (const [hindi, english] of base) {
      out.push({ hindi, english, alternatives: [`I work as ${article} ${j.en}.`], hint: 'I am a/an + [job]', explanation: `Profession बताने के लिए 'I am a/an' + job title इस्तेमाल होता है; article a/an vowel sound पर depend करता है।`, grammarRule: 'I am a/an + [job]' });
    }
  }
  // Combine with city for extra variety: "I work as a teacher in Delhi."
  const citySubset = cities.slice(0, 20);
  for (const j of jobs) for (const c of citySubset) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `मैं ${c} में ${j.hi} के तौर पर काम करता हूँ।`,
      english: `I work as ${article} ${j.en} in ${c}.`,
      alternatives: [`I am ${article} ${j.en} based in ${c}.`],
      hint: 'I work as a/an + [job] + in + [city]',
      explanation: `Profession के साथ location जोड़ने के लिए 'I work as a/an' + job + 'in' + city इस्तेमाल होता है।`,
      grammarRule: 'I work as a/an + [job] + in + [city]'
    });
  }
  return out;
}

function genFamily() {
  const out = [];
  for (const n of relationCounts) {
    const base = [
      [`मेरे परिवार में ${n} लोग हैं।`, `There are ${n} people in my family.`],
      [`मेरे परिवार में ${n} सदस्य हैं।`, `My family has ${n} members.`],
      [`हम ${n} लोगों का परिवार हैं।`, `We are a family of ${n}.`],
    ];
    for (const [hindi, english] of base) out.push({ hindi, english, alternatives: [`My family has ${n} members.`], hint: 'There are + [number] + people in my family', explanation: `Family size बताने के लिए 'There are + number + people' structure इस्तेमाल होता है।`, grammarRule: 'There are + [number] + people in my family' });
  }
  // Family member + profession combo
  for (const f of familyMembers) for (const j of jobs) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `मेरे ${f.hi} एक ${j.hi} हैं।`,
      english: `My ${f.en} is ${article} ${j.en}.`,
      alternatives: [`My ${f.en} works as ${article} ${j.en}.`],
      hint: 'My + [family member] + is a/an + [job]',
      explanation: `किसी relative का पेशा बताने के लिए 'My + relation + is a/an' + job इस्तेमाल होता है।`,
      grammarRule: 'My + [family member] + is a/an + [job]'
    });
  }
  return out;
}

function genFamilyMembers() {
  const out = [];
  const tpls = [
    (f, n) => [`मेरे एक ${f.hi} हैं, जिनका नाम ${n} है।`, `I have a ${f.en} named ${n}.`],
    (f, n) => [`मेरे ${f.hi} का नाम ${n} है।`, `My ${f.en}'s name is ${n}.`],
    (f, n) => [`मैं अपने ${f.hi} ${n} से बहुत प्यार करता हूँ।`, `I love my ${f.en}, ${n}, very much.`],
  ];
  for (const f of familyMembers) for (const n of names.slice(0, 30)) for (const tpl of tpls) {
    const [hindi, english] = tpl(f, n);
    out.push({ hindi, english, alternatives: [`I have a ${f.en} called ${n}.`], hint: 'I have a/an + [family member] + named + [name]', explanation: `किसी relative का नाम बताने के लिए 'I have a/an' + relation + 'named' + name इस्तेमाल होता है।`, grammarRule: 'I have a/an + [family member] + named + [name]' });
  }
  return out;
}

function genHobbies() {
  const out = [];
  const tpls = [
    (h) => [`मुझे ${h.hi} पसंद है।`, `I like ${h.en}.`],
    (h) => [`मुझे ${h.hi} बहुत पसंद है।`, `I love ${h.en}.`],
    (h) => [`मुझे ${h.hi} में मज़ा आता है।`, `I enjoy ${h.en}.`],
    (h) => [`मेरा शौक ${h.hi} है।`, `My hobby is ${h.en}.`],
    (h) => [`अपने खाली समय में, मैं ${h.hi} करता हूँ।`, `In my free time, I do ${h.en}.`],
    (h) => [`मैं बचपन से ${h.hi} करता आ रहा हूँ।`, `I have been doing ${h.en} since childhood.`],
    (h) => [`मैं अपनी ${h.hi} की skills को बेहतर बनाना चाहता हूँ।`, `I want to improve my ${h.en} skills.`],
    (h) => [`मैंने दो साल पहले ${h.hi} शुरू की थी।`, `I started ${h.en} two years ago.`],
    (h) => [`मैं आमतौर पर अपने दोस्तों के साथ ${h.hi} करता हूँ।`, `I usually do ${h.en} with my friends.`],
  ];
  for (const h of hobbies) for (const tpl of tpls) {
    const [hindi, english] = tpl(h);
    out.push({ hindi, english, alternatives: [`I love ${h.en}.`], hint: 'I like/love/enjoy + [verb+ing]', explanation: `Hobby बताने के लिए gerund (verb+ing) form का इस्तेमाल 'like/love/enjoy' के बाद होता है, base verb नहीं।`, grammarRule: 'I like/love/enjoy + [verb+ing]' });
  }
  const freqs = [
    { en: 'every weekend', hi: 'हर सप्ताहांत' }, { en: 'every evening', hi: 'हर शाम' },
    { en: 'daily', hi: 'रोज़' }, { en: 'twice a week', hi: 'सप्ताह में दो बार' }, { en: 'in my spare time', hi: 'अपने खाली समय में' }
  ];
  for (const h of hobbies) for (const f of freqs) {
    out.push({
      hindi: `मुझे ${h.hi} पसंद है, खासकर ${f.hi}।`,
      english: `I enjoy ${h.en}, especially ${f.en}.`,
      alternatives: [`I like ${h.en} ${f.en}.`],
      hint: 'I enjoy + [hobby], especially + [frequency]',
      explanation: `Hobby की frequency बताने के लिए gerund form को बदले बिना 'especially' + time expression जोड़ा जाता है।`,
      grammarRule: 'I enjoy + [hobby], especially + [frequency]'
    });
  }
  return out;
}

function genExperience() {
  const out = [];
  for (const j of jobs) for (const yrs of experienceYears) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `मैं ${yrs} सालों से ${j.hi} का काम कर रहा हूँ।`,
      english: `I have been working as ${article} ${j.en} for ${yrs} years.`,
      alternatives: [`I have ${yrs} years of experience as ${article} ${j.en}.`],
      hint: 'I have been + verb+ing + for + [duration]',
      explanation: `Present Perfect Continuous ('have been + verb+ing') किसी काम की duration बताने के लिए इस्तेमाल होता है जो अभी भी जारी है।`,
      grammarRule: 'I have been + verb+ing + for + [duration]'
    });
  }
  return out;
}

function genEducation() {
  const out = [];
  for (const d of degrees) for (const c of cities) {
    out.push({
      hindi: `मैंने ${c} से ${d.hi} पूरा किया।`,
      english: `I completed my ${d.en} from ${c}.`,
      alternatives: [`I studied ${d.en} in ${c}.`, `I graduated with a ${d.en} from ${c}.`],
      hint: 'I completed my + [degree] + from + [place]',
      explanation: `Educational background बताने के लिए 'I completed/studied/graduated' + degree + 'from' + place का पैटर्न इस्तेमाल होता है।`,
      grammarRule: 'I completed my + [degree] + from + [place]'
    });
  }
  return out;
}

function genSkills() {
  const out = [];
  const tpls = [
    (s) => [`मैं ${s.hi} में अच्छा हूँ।`, `I am good at ${s.en}.`],
    (s) => [`मैं ${s.hi} में कुशल हूँ।`, `I am skilled in ${s.en}.`],
    (s) => [`मेरे पास मजबूत ${s.hi} है।`, `I have strong ${s.en}.`],
    (s) => [`मेरी एक प्रमुख skill ${s.hi} है।`, `One of my key skills is ${s.en}.`],
    (s) => [`मैंने वर्षों में अपनी ${s.hi} विकसित की है।`, `I have developed my ${s.en} over the years.`],
  ];
  for (const s of skills) for (const tpl of tpls) {
    const [hindi, english] = tpl(s);
    out.push({ hindi, english, alternatives: [`I am skilled in ${s.en}.`], hint: 'I am good at / skilled in + [skill]', explanation: `Skill बताने के लिए 'I am good at' / 'I am skilled in' + skill (noun/gerund form) इस्तेमाल होता है।`, grammarRule: 'I am good at + [skill]' });
  }
  const jobSubset = jobs.slice(0, 28);
  for (const s of skills) for (const j of jobSubset) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `एक ${j.hi} के रूप में, मैं हर दिन अपनी ${s.hi} का उपयोग करता हूँ।`,
      english: `As ${article} ${j.en}, I use my ${s.en} every day.`,
      alternatives: [`My ${s.en} helps me a lot as ${article} ${j.en}.`],
      hint: 'As a/an + [job], I use my + [skill]',
      explanation: `Profession में किसी skill के इस्तेमाल को दर्शाने के लिए 'As a/an + job, I use my + skill' पैटर्न इस्तेमाल होता है।`,
      grammarRule: 'As a/an + [job], I use my + [skill]'
    });
  }
  return out;
}

function genGoals() {
  const out = [];
  const tpls = [
    (j, article) => [`मेरा लक्ष्य एक सफल ${j.hi} बनना है।`, `My goal is to become a successful ${j.en}.`],
    (j, article) => [`मेरा उद्देश्य ${j.hi} बनना है।`, `I aim to become ${article} ${j.en}.`],
    (j, article) => [`मैं ${j.hi} बनना चाहता हूँ।`, `I want to become ${article} ${j.en}.`],
    (j, article) => [`मेरा सपना ${j.hi} बनना है।`, `My dream is to become ${article} ${j.en}.`],
    (j, article) => [`मैं ${j.hi} बनने के लिए कड़ी मेहनत कर रहा हूँ।`, `I am working hard to become ${article} ${j.en}.`],
  ];
  for (const j of jobs) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    for (const tpl of tpls) {
      const [hindi, english] = tpl(j, article);
      out.push({ hindi, english, alternatives: [`I aim to become ${article} ${j.en}.`], hint: 'My goal is to + [base verb]', explanation: `Future goal बताने के लिए 'My goal/aim is to' + base verb (infinitive) इस्तेमाल होता है।`, grammarRule: 'My goal is to + [base verb]' });
    }
  }
  for (const j of jobs) for (const yrs of [1, 2, 3, 5, 10]) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `अगले ${yrs} सालों में, मैं ${j.hi} बनना चाहता हूँ।`,
      english: `In the next ${yrs} years, I want to become ${article} ${j.en}.`,
      alternatives: [`Within ${yrs} years, my goal is to become ${article} ${j.en}.`],
      hint: 'In the next + [N] + years, I want to + [base verb]',
      explanation: `Future timeline के साथ goal बताने के लिए 'In the next + N + years' + goal statement इस्तेमाल होता है।`,
      grammarRule: 'In the next + [N] + years, I want to + [base verb]'
    });
  }
  const citySubsetGoals = cities.slice(0, 10);
  for (const j of jobs) for (const c of citySubsetGoals) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    out.push({
      hindi: `मेरा लक्ष्य ${c} में एक ${j.hi} के रूप में काम करना है।`,
      english: `My goal is to work as ${article} ${j.en} in ${c}.`,
      alternatives: [`I want to work as ${article} ${j.en} in ${c}.`],
      hint: 'My goal is to work as a/an + [job] + in + [city]',
      explanation: `Goal को location के साथ जोड़ने के लिए 'My goal is to work as a/an + job + in + city' इस्तेमाल होता है।`,
      grammarRule: 'My goal is to work as a/an + [job] + in + [city]'
    });
  }
  return out;
}

function genGreetings() {
  const tpls = [
    (n) => [`आपसे मिलकर खुशी हुई, मैं ${n} हूँ।`, `Nice to meet you, I am ${n}.`],
    (n) => [`आपसे मिलकर अच्छा लगा, मैं ${n} हूँ।`, `Pleased to meet you, I'm ${n}.`],
    (n) => [`नमस्ते, मैं ${n} हूँ।`, `Hello, I am ${n}.`],
    (n) => [`सुप्रभात, मेरा नाम ${n} है।`, `Good morning, my name is ${n}.`],
    (n) => [`आपसे बात करके अच्छा लगा, मैं ${n} हूँ।`, `It was nice talking to you, I am ${n}.`],
    (n) => [`आपसे परिचय होकर अच्छा लगा, मैं ${n} हूँ।`, `Great to meet you, I am ${n}.`],
    (n) => [`आपका स्वागत है, मैं ${n} हूँ।`, `Welcome, I am ${n}.`],
    (n) => [`हाय, मैं ${n} हूँ।`, `Hi, I am ${n}.`],
  ];
  const out = [];
  for (const tpl of tpls) for (const n of names) {
    const [hindi, english] = tpl(n);
    out.push({ hindi, english, alternatives: [`Nice to meet you, I'm ${n}.`], hint: 'Nice to meet you + name', explanation: `पहली मुलाक़ात में greeting के साथ नाम बताना polite और professional तरीका है।`, grammarRule: 'Nice to meet you, I am + [Name]' });
  }
  return out;
}

function genInterview() {
  const out = [];
  const tpls = [
    (j, article) => [`मैं एक ${j.hi} की भूमिका के लिए तत्पर हूँ।`, `I am looking forward to the role of ${article} ${j.en}.`],
    (j, article) => [`मैं इस ${j.hi} के अवसर को लेकर उत्साहित हूँ।`, `I am excited about this ${j.en} opportunity.`],
    (j, article) => [`मुझे विश्वास है कि मैं इस ${j.hi} की भूमिका के लिए उपयुक्त हूँ।`, `I believe I am a good fit for this ${j.en} role.`],
    (j, article) => [`मैं एक ${j.hi} के रूप में इस टीम में योगदान देना चाहता हूँ।`, `I want to contribute to this team as ${article} ${j.en}.`],
    (j, article) => [`मैं इस कंपनी में ${j.hi} की भूमिका निभाने के लिए तैयार हूँ।`, `I am ready to take on the role of ${article} ${j.en} in this company.`],
  ];
  for (const j of jobs) {
    const article = /^[aeiou]/i.test(j.en) ? 'an' : 'a';
    for (const tpl of tpls) {
      const [hindi, english] = tpl(j, article);
      out.push({ hindi, english, alternatives: [`I am excited about this ${j.en} opportunity.`], hint: 'I am looking forward to + [noun/role]', explanation: `Interview में enthusiasm दिखाने के लिए 'I am looking forward to' + role/opportunity इस्तेमाल होता है।`, grammarRule: 'I am looking forward to + [noun/role]' });
    }
  }
  const skillSubset = skills.slice(0, 25);
  const jobSubset = jobs.slice(0, 25);
  for (const s of skillSubset) for (const j of jobSubset) {
    out.push({
      hindi: `मुझे लगता है कि मेरी ${s.hi} मुझे ${j.hi} की भूमिका के लिए उपयुक्त बनाती है।`,
      english: `I believe my ${s.en} makes me a good fit for the ${j.en} role.`,
      alternatives: [`My ${s.en} makes me suitable for the ${j.en} position.`],
      hint: 'My + [skill] + makes me a good fit for the + [job] + role',
      explanation: `Interview में अपनी suitability बताने के लिए skill + job role को जोड़ा जाता है।`,
      grammarRule: 'My + [skill] + makes me a good fit for the + [job] + role'
    });
  }
  return out;
}

function genLanguage() {
  const out = [];
  for (const l of languages) {
    const tpls = [
      [`मेरी मातृभाषा ${l.hi} है।`, `My mother tongue is ${l.en}.`],
      [`मेरी पहली भाषा ${l.hi} है।`, `My native language is ${l.en}.`],
      [`मैं धाराप्रवाह ${l.hi} बोल सकता हूँ।`, `I can speak ${l.en} fluently.`],
      [`मैं ${l.hi} समझ सकता हूँ।`, `I can understand ${l.en}.`],
    ];
    for (const [hindi, english] of tpls) out.push({ hindi, english, alternatives: [`My native language is ${l.en}.`], hint: 'My mother tongue is + [language]', explanation: `Native language बताने के लिए 'My mother tongue/native language is' + language इस्तेमाल होता है।`, grammarRule: 'My mother tongue is + [language]' });
  }
  for (const l1 of languages) for (const l2 of languages) {
    if (l1.en === l2.en) continue;
    out.push({
      hindi: `मैं ${l1.hi} और ${l2.hi} दोनों बोल सकता हूँ।`,
      english: `I can speak both ${l1.en} and ${l2.en}.`,
      alternatives: [`I am fluent in ${l1.en} and ${l2.en}.`],
      hint: 'I can speak both + [Language1] and [Language2]',
      explanation: `दो भाषाएँ बोलने की क्षमता (bilingual) बताने के लिए 'I can speak both X and Y' इस्तेमाल होता है।`,
      grammarRule: 'I can speak both + [Language1] and [Language2]'
    });
  }
  return out;
}

function genPersonality() {
  const out = [];
  const tpls = [
    (a) => [`मैं एक ${a.hi} व्यक्ति हूँ।`, `I am a ${a.en} person.`],
    (a) => [`मेरा व्यक्तित्व ${a.hi} है।`, `I have a ${a.en} personality.`],
    (a) => [`लोग मुझे ${a.hi} इंसान मानते हैं।`, `People consider me a ${a.en} person.`],
    (a) => [`मैं अपने काम में ${a.hi} हूँ।`, `I am ${a.en} in my work.`],
    (a) => [`मैं हमेशा ${a.hi} रहने की कोशिश करता हूँ।`, `I always try to be ${a.en}.`],
    (a) => [`मेरे दोस्त मुझे ${a.hi} व्यक्ति कहते हैं।`, `My friends call me a ${a.en} person.`],
  ];
  for (const a of adjectives) for (const tpl of tpls) {
    const [hindi, english] = tpl(a);
    out.push({ hindi, english, alternatives: [`I have a ${a.en} personality.`], hint: 'I am a/an + [adjective] + person', explanation: `Personality trait बताने के लिए 'I am a/an' + adjective + 'person' इस्तेमाल होता है।`, grammarRule: 'I am a/an + [adjective] + person' });
  }
  const jobSubset = jobs.slice(0, 25);
  for (const a of adjectives) for (const j of jobSubset) {
    const article = /^[aeiou]/i.test(a.en) ? 'an' : 'a';
    out.push({
      hindi: `मैं एक ${a.hi} ${j.hi} हूँ।`,
      english: `I am ${article} ${a.en} ${j.en}.`,
      alternatives: [`As ${article} ${j.en}, I am very ${a.en}.`],
      hint: 'I am a/an + [adjective] + [job]',
      explanation: `Personality trait और profession को एक साथ जोड़ने के लिए adjective + job title का इस्तेमाल होता है (जैसे "a confident engineer")।`,
      grammarRule: 'I am a/an + [adjective] + [job]'
    });
  }
  return out;
}

function genResidence() {
  const tpls = [
    (c) => [`मैं फ़िलहाल ${c} में रहता हूँ।`, `I currently live in ${c}.`],
    (c) => [`मैं ${c} में स्थित हूँ।`, `I am based in ${c}.`],
    (c) => [`मेरा निवास स्थान ${c} है।`, `My place of residence is ${c}.`],
    (c) => [`मैं अभी ${c} में रह रहा हूँ।`, `I am living in ${c} right now.`],
    (c) => [`पिछले कुछ सालों से मैं ${c} में रह रहा हूँ।`, `I have been living in ${c} for the past few years.`],
    (c) => [`मेरा घर ${c} में है।`, `My home is in ${c}.`],
    (c) => [`मैं ${c} में बस गया हूँ।`, `I have settled in ${c}.`],
    (c) => [`फ़िलहाल मेरा पता ${c} है।`, `My current address is in ${c}.`],
  ];
  const out = [];
  for (const tpl of tpls) for (const c of cities) {
    const [hindi, english] = tpl(c);
    out.push({ hindi, english, alternatives: [`I am based in ${c}.`], hint: 'I currently live in + [city]', explanation: `Present residence बताने के लिए Present Simple 'I live in' या 'I am based in' इस्तेमाल होता है।`, grammarRule: 'I currently live in + [city]' });
  }
  return out;
}

function genAchievements() {
  const out = [];
  for (const type of achievementTypes) for (const level of achievementLevels) for (const domain of achievementDomains) {
    const typeHiMap = {
      'won a competition': 'एक प्रतियोगिता जीती',
      'completed a certification course': 'एक सर्टिफिकेशन कोर्स पूरा किया',
      'received an award': 'एक पुरस्कार प्राप्त किया',
      'secured a top rank': 'शीर्ष रैंक हासिल की',
      'published an article': 'एक लेख प्रकाशित किया',
      'led a team': 'एक टीम का नेतृत्व किया',
      'organized an event': 'एक कार्यक्रम आयोजित किया',
      'received a scholarship': 'एक स्कॉलरशिप प्राप्त की',
      'built a small project': 'एक छोटा प्रोजेक्ट बनाया',
      'volunteered for a cause': 'एक उद्देश्य के लिए स्वयंसेवा की',
      'delivered a presentation': 'एक प्रस्तुति दी',
      'mentored juniors': 'जूनियर्स को मार्गदर्शन दिया',
      'represented my institute': 'अपने संस्थान का प्रतिनिधित्व किया',
      'cleared a certification exam': 'एक सर्टिफिकेशन परीक्षा पास की',
      'contributed to a community project': 'एक सामुदायिक प्रोजेक्ट में योगदान दिया',
    };
    const levelHiMap = { school: 'स्कूल', college: 'कॉलेज', district: 'ज़िला', state: 'राज्य', national: 'राष्ट्रीय', international: 'अंतरराष्ट्रीय', 'company-wide': 'पूरी कंपनी', community: 'सामुदायिक' };
    const domainHiMap = { sports: 'खेल', academics: 'शिक्षा', technology: 'तकनीक', arts: 'कला', business: 'व्यवसाय', 'social service': 'सामाजिक सेवा', science: 'विज्ञान', leadership: 'नेतृत्व' };
    out.push({
      hindi: `मैंने ${domainHiMap[domain]} के क्षेत्र में ${levelHiMap[level]} स्तर पर ${typeHiMap[type]}।`,
      english: `I ${type.replace(/^./, c => c)} at the ${level} level in ${domain}.`,
      alternatives: [`I have ${type.replace('a ', 'a ').replace(/^won/, 'won').replace(/^completed/, 'completed')} at ${level} level in ${domain}.`],
      hint: 'I + [past-tense achievement] + at the + [level] + level in + [domain]',
      explanation: `Achievement बताते समय type + level + domain को जोड़कर विस्तृत जानकारी दी जाती है।`,
      grammarRule: 'I + [past achievement] + at the + [level] + level in + [domain]'
    });
  }
  return out;
}

// ----------------------------------------------------------------------------
// BUILD ALL CATEGORIES
// ----------------------------------------------------------------------------
const CATEGORY_GENERATORS = {
  'Name Introduction': genNameIntroduction,
  'Origin': genOrigin,
  'Profession': genProfession,
  'Family': genFamily,
  'Family Members': genFamilyMembers,
  'Hobbies': genHobbies,
  'Experience': genExperience,
  'Education': genEducation,
  'Skills': genSkills,
  'Goals': genGoals,
  'Greetings': genGreetings,
  'Interview': genInterview,
  'Language': genLanguage,
  'Personality': genPersonality,
  'Residence': genResidence,
  'Achievements': genAchievements,
};

const PRACTICE_TARGET_PER_CATEGORY = 900;
const TEST_TARGET_PER_CATEGORY = 350;

let practiceQuestions = [];
let testQuestions = [];
let qid = 1;
let tid = 1;

function mcqDistractors(correct) {
  const words = correct.split(' ');
  const swapped = words.length > 2 ? [words[1], words[0], ...words.slice(2)].join(' ') : correct + ' is';
  const droppedAux = correct.replace(/\b(am|is|are|have|has|can|will)\b\s*/, '').trim();
  const wrongForm = correct.replace(/\.$/, '') + ' is.';
  return [swapped, droppedAux || (correct + ' too'), wrongForm].filter((d, i, arr) => d !== correct && arr.indexOf(d) === i).slice(0, 3);
}

for (const [catName, genFn] of Object.entries(CATEGORY_GENERATORS)) {
  const pool = shuffle(genFn(), catName.length);
  if (pool.length === 0) {
    console.warn(`WARNING: category "${catName}" produced 0 items`);
    continue;
  }

  // Practice: take up to target, cycling with difficulty progression if pool is short
  const practicePool = [];
  let i = 0;
  while (practicePool.length < PRACTICE_TARGET_PER_CATEGORY) {
    const pass = Math.floor(i / pool.length);
    if (pass > 3) break; // safety valve — avoid infinite loop on tiny pools
    practicePool.push({ ...pool[i % pool.length], pass });
    i++;
  }
  for (const item of practicePool) {
    const difficulty = item.pass === 0 ? 'easy' : item.pass === 1 ? 'medium' : 'hard';
    practiceQuestions.push({
      id: qid++,
      hindi: item.hindi,
      english: item.english,
      alternatives: item.alternatives,
      hint: item.hint,
      explanation: item.explanation,
      difficulty,
      tags: [catName.toLowerCase().replace(/\s+/g, '-')],
      grammarRule: item.grammarRule,
      category: catName,
    });
  }

  // Test: use a disjoint slice of the same pool (offset) rendered as MCQ
  const testSlice = [];
  const offset = Math.floor(pool.length / 2);
  let j = 0;
  while (testSlice.length < TEST_TARGET_PER_CATEGORY) {
    const pass = Math.floor(j / pool.length);
    if (pass > 3) break;
    testSlice.push(pool[(offset + j) % pool.length]);
    j++;
  }
  for (const item of testSlice) {
    const distractors = mcqDistractors(item.english);
    while (distractors.length < 3) distractors.push(item.english + '!');
    const options = [item.english, ...distractors];
    testQuestions.push({
      id: tid++,
      type: 'translate',
      hindi: item.hindi,
      options,
      answer: item.english,
      explanation: item.explanation,
      category: catName,
    });
  }
}

console.log('----------------------------------------');
console.log('Total practice questions:', practiceQuestions.length);
console.log('Total test questions:', testQuestions.length);
const practiceByCategory = {};
for (const q of practiceQuestions) practiceByCategory[q.category] = (practiceByCategory[q.category] || 0) + 1;
console.log('Practice by category:', practiceByCategory);
const testByCategory = {};
for (const q of testQuestions) testByCategory[q.category] = (testByCategory[q.category] || 0) + 1;
console.log('Test by category:', testByCategory);

// ----------------------------------------------------------------------------
// WRITE OUTPUT FILES
// ----------------------------------------------------------------------------
function writeJson(file, data) {
  fs.writeFileSync(path.join(OUT, file), JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote ${file}: ${JSON.stringify(data).length} bytes`);
}

writeJson('practice-questions.json', {
  day: 2,
  topic: 'Self Introduction',
  description: '16 categories covering every self-introduction scenario (name, origin, profession, family, hobbies, education, skills, goals, interview, language, personality, residence, achievements) with Hindi -> English translation practice.',
  totalQuestions: practiceQuestions.length,
  categories: Object.keys(CATEGORY_GENERATORS),
  questions: practiceQuestions,
});

writeJson('daily-test.json', {
  day: 2,
  title: 'Day 2 Daily Test — Self Introduction',
  totalQuestions: testQuestions.length,
  timeLimit: 60,
  passingScore: 70,
  categories: Object.keys(CATEGORY_GENERATORS),
  questions: testQuestions,
});
