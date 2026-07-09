#!/usr/bin/env node
// Generator script for Day 4 - Be Verb content
// Run: node gen_day04.js
// Delete after running

const fs = require('fs');
const path = require('path');

const BASE = 'data/challenge/day-04';

// ============================================================
// PRACTICE QUESTIONS - target 950
// ============================================================

const difficulties = ['easy','medium','hard'];
const tags = ['be-verb'];
const grammarRule = 'Be Verb';
const category = 'be verb practice';

// Core sentence pairs covering: am/is/are/was/were, positive/negative/question, 
// identity/occupation/state/location/description, daily/office/formal/interview
const corePairs = [
  // I am - identity
  {h:"मैं एक छात्र हूँ।",e:"I am a student.",d:"easy"},
  {h:"मैं खुश हूँ।",e:"I am happy.",d:"easy"},
  {h:"मैं दिल्ली से हूँ।",e:"I am from Delhi.",d:"easy"},
  {h:"मैं तैयार हूँ।",e:"I am ready.",d:"easy"},
  {h:"मैं एक इंजीनियर हूँ।",e:"I am an engineer.",d:"easy"},
  {h:"मैं थका हुआ हूँ।",e:"I am tired.",d:"easy"},
  {h:"मैं घर पर हूँ।",e:"I am at home.",d:"easy"},
  {h:"मैं 25 साल का हूँ।",e:"I am 25 years old.",d:"easy"},
  {h:"मैं सही हूँ।",e:"I am right.",d:"easy"},
  {h:"मैं गलत हूँ।",e:"I am wrong.",d:"easy"},
  {h:"मैं भूखा हूँ।",e:"I am hungry.",d:"easy"},
  {h:"मैं प्यासा हूँ।",e:"I am thirsty.",d:"easy"},
  {h:"मैं ठीक हूँ।",e:"I am fine.",d:"easy"},
  {h:"मैं बीमार हूँ।",e:"I am sick.",d:"easy"},
  {h:"मैं एक डॉक्टर हूँ।",e:"I am a doctor.",d:"easy"},
  {h:"मैं यहाँ हूँ।",e:"I am here.",d:"easy"},
  {h:"मैं देर से आया हूँ।",e:"I am late.",d:"easy"},
  {h:"मैं व्यस्त हूँ।",e:"I am busy.",d:"easy"},
  {h:"मैं गंभीर हूँ।",e:"I am serious.",d:"easy"},
  {h:"मैं घबराया हुआ हूँ।",e:"I am nervous.",d:"easy"},
  {h:"मैं उत्साहित हूँ।",e:"I am excited.",d:"easy"},
  {h:"मैं गर्वित हूँ।",e:"I am proud.",d:"easy"},
  {h:"मैं आत्मविश्वासी हूँ।",e:"I am confident.",d:"easy"},
  {h:"मैं भारतीय हूँ।",e:"I am Indian.",d:"easy"},
  {h:"मैं एक अच्छा दोस्त हूँ।",e:"I am a good friend.",d:"easy"},
  {h:"मैं ऑफिस में हूँ।",e:"I am in the office.",d:"easy"},
  {h:"मैं ट्रेन में हूँ।",e:"I am on the train.",d:"easy"},
  {h:"मैं मीटिंग में हूँ।",e:"I am in a meeting.",d:"medium"},
  {h:"मैं खुश नहीं हूँ।",e:"I am not happy.",d:"medium"},
  {h:"मैं शादीशुदा हूँ।",e:"I am married.",d:"easy"},
  {h:"मैं एक वकील हूँ।",e:"I am a lawyer.",d:"easy"},
  {h:"मैं एक शिक्षक हूँ।",e:"I am a teacher.",d:"easy"},
  {h:"मैं एक मैनेजर हूँ।",e:"I am a manager.",d:"easy"},
  {h:"मैं एक नर्स हूँ।",e:"I am a nurse.",d:"easy"},
  {h:"मैं एक पायलट हूँ।",e:"I am a pilot.",d:"easy"},
  {h:"मैं एक व्यापारी हूँ।",e:"I am a businessman.",d:"easy"},
  {h:"मैं एक गायक हूँ।",e:"I am a singer.",d:"easy"},
  {h:"मैं एक अभिनेता हूँ।",e:"I am an actor.",d:"easy"},
  {h:"मैं एक किसान हूँ।",e:"I am a farmer.",d:"easy"},
  {h:"मैं एक सैनिक हूँ।",e:"I am a soldier.",d:"easy"},
  {h:"मैं स्वस्थ हूँ।",e:"I am healthy.",d:"easy"},
  {h:"मैं मज़बूत हूँ।",e:"I am strong.",d:"easy"},
  {h:"मैं होशियार हूँ।",e:"I am smart.",d:"easy"},
  {h:"मैं बुद्धिमान हूँ।",e:"I am intelligent.",d:"easy"},
  {h:"मैं दयालु हूँ।",e:"I am kind.",d:"easy"},
  {h:"मैं बहादुर हूँ।",e:"I am brave.",d:"easy"},
  {h:"मैं ऊबा हुआ हूँ।",e:"I am bored.",d:"easy"},
  {h:"मैं जल्दी यहाँ हूँ।",e:"I am early.",d:"easy"},
  {h:"मैं बहुत खुश हूँ।",e:"I am very happy.",d:"easy"},
  {h:"मैं काफी थका हूँ।",e:"I am quite tired.",d:"medium"},
  // He/She is
  {h:"वह एक छात्र है।",e:"He is a student.",d:"easy"},
  {h:"वह खुश है।",e:"She is happy.",d:"easy"},
  {h:"वह एक डॉक्टर है।",e:"He is a doctor.",d:"easy"},
  {h:"वह एक शिक्षिका है।",e:"She is a teacher.",d:"easy"},
  {h:"वह तैयार है।",e:"He is ready.",d:"easy"},
  {h:"वह थकी हुई है।",e:"She is tired.",d:"easy"},
  {h:"वह घर पर है।",e:"He is at home.",d:"easy"},
  {h:"वह 30 साल का है।",e:"He is 30 years old.",d:"easy"},
  {h:"वह सही है।",e:"She is right.",d:"easy"},
  {h:"वह बीमार है।",e:"He is sick.",d:"easy"},
  {h:"वह लंबा है।",e:"He is tall.",d:"easy"},
  {h:"वह सुंदर है।",e:"She is beautiful.",d:"easy"},
  {h:"वह एक वकील है।",e:"He is a lawyer.",d:"easy"},
  {h:"वह व्यस्त है।",e:"She is busy.",d:"easy"},
  {h:"वह यहाँ है।",e:"He is here.",d:"easy"},
  {h:"वह अनुपस्थित है।",e:"He is absent.",d:"easy"},
  {h:"वह उपस्थित है।",e:"She is present.",d:"easy"},
  {h:"वह एक इंजीनियर है।",e:"He is an engineer.",d:"easy"},
  {h:"वह एक मैनेजर है।",e:"She is a manager.",d:"easy"},
  {h:"वह एक पायलट है।",e:"He is a pilot.",d:"easy"},
  {h:"वह घबरायी हुई है।",e:"She is nervous.",d:"easy"},
  {h:"वह उत्साहित है।",e:"He is excited.",d:"easy"},
  {h:"वह दयालु है।",e:"She is kind.",d:"easy"},
  {h:"वह बहादुर है।",e:"He is brave.",d:"easy"},
  {h:"वह होशियार है।",e:"She is smart.",d:"easy"},
  {h:"वह अमीर है।",e:"He is rich.",d:"easy"},
  {h:"वह गरीब है।",e:"She is poor.",d:"easy"},
  {h:"वह मशहूर है।",e:"He is famous.",d:"easy"},
  {h:"वह अच्छा है।",e:"He is good.",d:"easy"},
  {h:"वह जवान है।",e:"She is young.",d:"easy"},
  {h:"वह बूढ़ा है।",e:"He is old.",d:"easy"},
  {h:"वह दिल्ली में है।",e:"She is in Delhi.",d:"easy"},
  {h:"वह स्कूल में है।",e:"He is at school.",d:"easy"},
  {h:"वह ऑफिस में है।",e:"She is at work.",d:"easy"},
  {h:"वह मीटिंग में है।",e:"He is in a meeting.",d:"medium"},
  {h:"वह ट्रेन में है।",e:"She is on the train.",d:"easy"},
  {h:"वह शादीशुदा है।",e:"He is married.",d:"easy"},
  {h:"वह अविवाहित है।",e:"She is single.",d:"easy"},
  {h:"वह खुश नहीं है।",e:"He is not happy.",d:"medium"},
  {h:"वह यहाँ नहीं है।",e:"She is not here.",d:"medium"},
  {h:"क्या वह तैयार है?",e:"Is he ready?",d:"medium"},
  {h:"क्या वह डॉक्टर है?",e:"Is she a doctor?",d:"medium"},
  {h:"वह एक प्रसिद्ध गायक है।",e:"He is a famous singer.",d:"medium"},
  {h:"वह बहुत बुद्धिमान है।",e:"She is very intelligent.",d:"medium"},
  {h:"वह एक समर्पित कर्मचारी है।",e:"He is a dedicated employee.",d:"medium"},
  {h:"वह एक नई छात्रा है।",e:"She is a new student.",d:"easy"},
  {h:"वह हमारा मैनेजर है।",e:"He is our manager.",d:"easy"},
  {h:"वह मेरी बहन है।",e:"She is my sister.",d:"easy"},
  {h:"वह मेरा भाई है।",e:"He is my brother.",d:"easy"},
  {h:"वह मेरी माँ है।",e:"She is my mother.",d:"easy"},
  // It is
  {h:"यह एक किताब है।",e:"It is a book.",d:"easy"},
  {h:"यह एक कलम है।",e:"It is a pen.",d:"easy"},
  {h:"यह एक कार है।",e:"It is a car.",d:"easy"},
  {h:"यह एक बिल्ली है।",e:"It is a cat.",d:"easy"},
  {h:"यह एक बड़ा घर है।",e:"It is a big house.",d:"easy"},
  {h:"यह आज ठंडा है।",e:"It is cold today.",d:"easy"},
  {h:"यह बहुत गर्म है।",e:"It is very hot.",d:"easy"},
  {h:"यह महँगा है।",e:"It is expensive.",d:"easy"},
  {h:"यह सस्ता है।",e:"It is cheap.",d:"easy"},
  {h:"यह अच्छा है।",e:"It is good.",d:"easy"},
  {h:"यह बुरा है।",e:"It is bad.",d:"easy"},
  {h:"यह नया है।",e:"It is new.",d:"easy"},
  {h:"यह पुराना है।",e:"It is old.",d:"easy"},
  {h:"यह महत्त्वपूर्ण है।",e:"It is important.",d:"easy"},
  {h:"यह कठिन है।",e:"It is difficult.",d:"easy"},
  {h:"यह आसान है।",e:"It is easy.",d:"easy"},
  {h:"यह दिलचस्प है।",e:"It is interesting.",d:"easy"},
  {h:"यह उबाऊ है।",e:"It is boring.",d:"easy"},
  {h:"यह स्वादिष्ट है।",e:"It is delicious.",d:"easy"},
  {h:"यह खाली है।",e:"It is empty.",d:"easy"},
  {h:"यह भरा हुआ है।",e:"It is full.",d:"easy"},
  {h:"यह साफ़ है।",e:"It is clean.",d:"easy"},
  {h:"यह गंदा है।",e:"It is dirty.",d:"easy"},
  {h:"यह खुला है।",e:"It is open.",d:"easy"},
  {h:"यह बंद है।",e:"It is closed.",d:"easy"},
  {h:"यह तेज़ है।",e:"It is fast.",d:"easy"},
  {h:"यह धीमा है।",e:"It is slow.",d:"easy"},
  {h:"मेरा नाम राहुल है।",e:"My name is Rahul.",d:"easy"},
  {h:"मेरा घर बड़ा है।",e:"My house is big.",d:"easy"},
  {h:"मेरी कार नई है।",e:"My car is new.",d:"easy"},
  {h:"किताब मेज़ पर है।",e:"The book is on the table.",d:"easy"},
  {h:"दुकान खुली है।",e:"The shop is open.",d:"easy"},
  {h:"बैंक बंद है।",e:"The bank is closed.",d:"easy"},
  {h:"पानी ठंडा है।",e:"The water is cold.",d:"easy"},
  {h:"चाय गर्म है।",e:"The tea is hot.",d:"easy"},
  {h:"खाना स्वादिष्ट है।",e:"The food is delicious.",d:"easy"},
  {h:"आसमान नीला है।",e:"The sky is blue.",d:"easy"},
  {h:"मौसम ठंडा है।",e:"The weather is cold.",d:"easy"},
  {h:"परीक्षा कठिन है।",e:"The exam is difficult.",d:"easy"},
  {h:"सवाल आसान है।",e:"The question is easy.",d:"easy"},
  {h:"कमरा साफ़ है।",e:"The room is clean.",d:"easy"},
  {h:"बोतल खाली है।",e:"The bottle is empty.",d:"easy"},
  {h:"गिलास भरा है।",e:"The glass is full.",d:"easy"},
  {h:"इंटरनेट धीमा है।",e:"The internet is slow.",d:"easy"},
  {h:"दरवाज़ा खुला है।",e:"The door is open.",d:"easy"},
  {h:"ऑफिस बंद है।",e:"The office is closed.",d:"medium"},
  {h:"फ़ोन बंद है।",e:"The phone is off.",d:"easy"},
  {h:"कंप्यूटर नया है।",e:"The computer is new.",d:"easy"},
  {h:"काम महत्त्वपूर्ण है।",e:"The work is important.",d:"medium"},
  {h:"प्रोजेक्ट बड़ा है।",e:"The project is big.",d:"medium"},
  // You are / We are / They are
  {h:"तुम खुश हो।",e:"You are happy.",d:"easy"},
  {h:"तुम तैयार हो।",e:"You are ready.",d:"easy"},
  {h:"तुम सही हो।",e:"You are right.",d:"easy"},
  {h:"तुम गलत हो।",e:"You are wrong.",d:"easy"},
  {h:"तुम थके हो।",e:"You are tired.",d:"easy"},
  {h:"तुम व्यस्त हो।",e:"You are busy.",d:"easy"},
  {h:"तुम एक छात्र हो।",e:"You are a student.",d:"easy"},
  {h:"तुम एक डॉक्टर हो।",e:"You are a doctor.",d:"easy"},
  {h:"तुम देर से आए हो।",e:"You are late.",d:"easy"},
  {h:"तुम जल्दी आए हो।",e:"You are early.",d:"easy"},
  {h:"तुम बहुत होशियार हो।",e:"You are very smart.",d:"easy"},
  {h:"तुम बहुत दयालु हो।",e:"You are very kind.",d:"easy"},
  {h:"क्या तुम तैयार हो?",e:"Are you ready?",d:"medium"},
  {h:"क्या तुम ठीक हो?",e:"Are you fine?",d:"medium"},
  {h:"क्या तुम एक शिक्षक हो?",e:"Are you a teacher?",d:"medium"},
  {h:"तुम अच्छे हो।",e:"You are good.",d:"easy"},
  {h:"तुम मेरे दोस्त हो।",e:"You are my friend.",d:"easy"},
  {h:"हम दोस्त हैं।",e:"We are friends.",d:"easy"},
  {h:"हम छात्र हैं।",e:"We are students.",d:"easy"},
  {h:"हम तैयार हैं।",e:"We are ready.",d:"easy"},
  {h:"हम थके हुए हैं।",e:"We are tired.",d:"easy"},
  {h:"हम खुश हैं।",e:"We are happy.",d:"easy"},
  {h:"हम दिल्ली में हैं।",e:"We are in Delhi.",d:"easy"},
  {h:"हम सहकर्मी हैं।",e:"We are colleagues.",d:"medium"},
  {h:"हम एक टीम हैं।",e:"We are a team.",d:"medium"},
  {h:"हम ऑफिस में हैं।",e:"We are in the office.",d:"easy"},
  {h:"हम व्यस्त हैं।",e:"We are busy.",d:"easy"},
  {h:"हम भारतीय हैं।",e:"We are Indian.",d:"easy"},
  {h:"हम यहाँ हैं।",e:"We are here.",d:"easy"},
  {h:"वे छात्र हैं।",e:"They are students.",d:"easy"},
  {h:"वे थके हुए हैं।",e:"They are tired.",d:"easy"},
  {h:"वे खुश हैं।",e:"They are happy.",d:"easy"},
  {h:"वे तैयार हैं।",e:"They are ready.",d:"easy"},
  {h:"वे यहाँ हैं।",e:"They are here.",d:"easy"},
  {h:"वे इंजीनियर हैं।",e:"They are engineers.",d:"easy"},
  {h:"वे हमारे दोस्त हैं।",e:"They are our friends.",d:"easy"},
  {h:"वे व्यस्त हैं।",e:"They are busy.",d:"easy"},
  {h:"वे बहुत अच्छे हैं।",e:"They are very good.",d:"easy"},
  {h:"वे भारतीय हैं।",e:"They are Indian.",d:"easy"},
  {h:"वे स्कूल में हैं।",e:"They are at school.",d:"easy"},
  {h:"वे ऑफिस में हैं।",e:"They are in the office.",d:"medium"},
  // Was / Were - past tense
  {h:"मैं कल बीमार था।",e:"I was sick yesterday.",d:"medium"},
  {h:"मैं पहले छात्र था।",e:"I was a student before.",d:"medium"},
  {h:"मैं उस समय खुश था।",e:"I was happy at that time.",d:"medium"},
  {h:"मैं घर पर था।",e:"I was at home.",d:"medium"},
  {h:"मैं देर से था।",e:"I was late.",d:"medium"},
  {h:"मैं बचपन में कमज़ोर था।",e:"I was weak in childhood.",d:"medium"},
  {h:"मैं पाँच साल पहले दिल्ली में था।",e:"I was in Delhi five years ago.",d:"medium"},
  {h:"मैं पिछले हफ़्ते व्यस्त था।",e:"I was busy last week.",d:"medium"},
  {h:"मैं कल ऑफिस में था।",e:"I was in the office yesterday.",d:"medium"},
  {h:"मैं पहले एक किसान था।",e:"I was a farmer before.",d:"medium"},
  {h:"वह कल अनुपस्थित था।",e:"He was absent yesterday.",d:"medium"},
  {h:"वह पहले शिक्षक था।",e:"He was a teacher before.",d:"medium"},
  {h:"वह कल थका हुआ था।",e:"He was tired yesterday.",d:"medium"},
  {h:"वह पिछले साल छात्र था।",e:"He was a student last year.",d:"medium"},
  {h:"वह वहाँ नहीं था।",e:"He was not there.",d:"medium"},
  {h:"वह बचपन में बहुत चंचल था।",e:"He was very playful in childhood.",d:"hard"},
  {h:"वह पाँच साल पहले अमीर था।",e:"He was rich five years ago.",d:"medium"},
  {h:"वह उस समय बच्चा था।",e:"He was a child at that time.",d:"medium"},
  {h:"वह बहुत बहादुर सैनिक था।",e:"He was a very brave soldier.",d:"medium"},
  {h:"वह कल स्कूल में था।",e:"He was at school yesterday.",d:"medium"},
  {h:"वह कल बीमार थी।",e:"She was sick yesterday.",d:"medium"},
  {h:"वह पहले एक नर्स थी।",e:"She was a nurse before.",d:"medium"},
  {h:"वह कल मीटिंग में थी।",e:"She was in a meeting yesterday.",d:"medium"},
  {h:"वह पिछले साल खुश थी।",e:"She was happy last year.",d:"medium"},
  {h:"वह उस समय घबरायी हुई थी।",e:"She was nervous at that time.",d:"medium"},
  {h:"हम कल बहुत व्यस्त थे।",e:"We were very busy yesterday.",d:"medium"},
  {h:"हम पिछले हफ़्ते दिल्ली में थे।",e:"We were in Delhi last week.",d:"medium"},
  {h:"हम बचपन में दोस्त थे।",e:"We were friends in childhood.",d:"medium"},
  {h:"हम कल ऑफिस में थे।",e:"We were in the office yesterday.",d:"medium"},
  {h:"हम पहले गरीब थे।",e:"We were poor before.",d:"medium"},
  {h:"वे कल यहाँ थे।",e:"They were here yesterday.",d:"medium"},
  {h:"वे पिछले हफ़्ते थके हुए थे।",e:"They were tired last week.",d:"medium"},
  {h:"वे पहले किसान थे।",e:"They were farmers before.",d:"medium"},
  {h:"वे कल खुश नहीं थे।",e:"They were not happy yesterday.",d:"medium"},
  {h:"वे पिछले साल दिल्ली में थे।",e:"They were in Delhi last year.",d:"medium"},
  // Negative sentences
  {h:"मैं तैयार नहीं हूँ।",e:"I am not ready.",d:"medium"},
  {h:"मैं यहाँ नहीं हूँ।",e:"I am not here.",d:"medium"},
  {h:"मैं थका नहीं हूँ।",e:"I am not tired.",d:"medium"},
  {h:"मैं व्यस्त नहीं हूँ।",e:"I am not busy.",d:"medium"},
  {h:"मैं बीमार नहीं हूँ।",e:"I am not sick.",d:"medium"},
  {h:"मैं गलत नहीं हूँ।",e:"I am not wrong.",d:"medium"},
  {h:"वह खुश नहीं है।",e:"He is not happy.",d:"medium"},
  {h:"वह तैयार नहीं है।",e:"She is not ready.",d:"medium"},
  {h:"वह यहाँ नहीं है।",e:"He is not here.",d:"medium"},
  {h:"वह बीमार नहीं है।",e:"She is not sick.",d:"medium"},
  {h:"वह डॉक्टर नहीं है।",e:"He is not a doctor.",d:"medium"},
  {h:"दुकान खुली नहीं है।",e:"The shop is not open.",d:"medium"},
  {h:"यह सही नहीं है।",e:"It is not correct.",d:"medium"},
  {h:"यह आसान नहीं है।",e:"It is not easy.",d:"medium"},
  {h:"हम तैयार नहीं हैं।",e:"We are not ready.",d:"medium"},
  {h:"वे यहाँ नहीं हैं।",e:"They are not here.",d:"medium"},
  {h:"मैं कल यहाँ नहीं था।",e:"I was not here yesterday.",d:"medium"},
  {h:"वह कल तैयार नहीं था।",e:"He was not ready yesterday.",d:"medium"},
  {h:"वे कल खुश नहीं थे।",e:"They were not happy yesterday.",d:"medium"},
  {h:"हम पहले यहाँ नहीं थे।",e:"We were not here before.",d:"medium"},
  // Question forms
  {h:"क्या मैं सही हूँ?",e:"Am I right?",d:"medium"},
  {h:"क्या मैं देर से हूँ?",e:"Am I late?",d:"medium"},
  {h:"क्या वह यहाँ है?",e:"Is he here?",d:"medium"},
  {h:"क्या वह एक डॉक्टर है?",e:"Is she a doctor?",d:"medium"},
  {h:"क्या यह सही है?",e:"Is it correct?",d:"medium"},
  {h:"क्या यह आसान है?",e:"Is it easy?",d:"medium"},
  {h:"क्या तुम तैयार हो?",e:"Are you ready?",d:"medium"},
  {h:"क्या तुम ठीक हो?",e:"Are you okay?",d:"medium"},
  {h:"क्या हम सही हैं?",e:"Are we right?",d:"medium"},
  {h:"क्या वे छात्र हैं?",e:"Are they students?",d:"medium"},
  {h:"क्या वह कल यहाँ था?",e:"Was he here yesterday?",d:"medium"},
  {h:"क्या वह बीमार थी?",e:"Was she sick?",d:"medium"},
  {h:"क्या हम वहाँ थे?",e:"Were we there?",d:"medium"},
  {h:"क्या वे खुश थे?",e:"Were they happy?",d:"medium"},
  // Contractions
  {h:"मैं तैयार हूँ। (I'm)",e:"I'm ready.",d:"medium"},
  {h:"वह एक शिक्षक है। (He's)",e:"He's a teacher.",d:"medium"},
  {h:"वह सुंदर है। (She's)",e:"She's beautiful.",d:"medium"},
  {h:"यह ठंडा है। (It's)",e:"It's cold.",d:"medium"},
  {h:"हम दोस्त हैं। (We're)",e:"We're friends.",d:"medium"},
  {h:"तुम सही हो। (You're)",e:"You're right.",d:"medium"},
  {h:"वे छात्र हैं। (They're)",e:"They're students.",d:"medium"},
  {h:"वह यहाँ नहीं है। (isn't)",e:"He isn't here.",d:"medium"},
  {h:"वे तैयार नहीं हैं। (aren't)",e:"They aren't ready.",d:"medium"},
  {h:"वह वहाँ नहीं था। (wasn't)",e:"He wasn't there.",d:"medium"},
  {h:"वे खुश नहीं थे। (weren't)",e:"They weren't happy.",d:"medium"},
  // Office/professional context
  {h:"मैं एक सॉफ़्टवेयर डेवलपर हूँ।",e:"I am a software developer.",d:"medium"},
  {h:"मैं अभी प्रोजेक्ट पर हूँ।",e:"I am on the project currently.",d:"medium"},
  {h:"वह हमारी टीम लीडर है।",e:"She is our team leader.",d:"medium"},
  {h:"वह एक सीनियर इंजीनियर है।",e:"He is a senior engineer.",d:"medium"},
  {h:"हम एक अच्छी कंपनी में हैं।",e:"We are in a good company.",d:"medium"},
  {h:"वे हमारे क्लाइंट हैं।",e:"They are our clients.",d:"medium"},
  {h:"बैठक कल थी।",e:"The meeting was yesterday.",d:"medium"},
  {h:"वे पिछले साल बहुत सफल थे।",e:"They were very successful last year.",d:"medium"},
  {h:"मैं इस काम के लिए तैयार हूँ।",e:"I am ready for this work.",d:"medium"},
  {h:"यह एक महत्त्वपूर्ण प्रोजेक्ट है।",e:"It is an important project.",d:"medium"},
  {h:"मैं एक अनुभवी कर्मचारी हूँ।",e:"I am an experienced employee.",d:"medium"},
  {h:"वह एक कुशल प्रबंधक है।",e:"She is a skilled manager.",d:"hard"},
  {h:"हम समय पर हैं।",e:"We are on time.",d:"medium"},
  {h:"क्या आप इस पद के लिए उपयुक्त हैं?",e:"Are you suitable for this position?",d:"hard"},
  {h:"मैं इंटरव्यू के लिए तैयार हूँ।",e:"I am ready for the interview.",d:"medium"},
  {h:"वह एक ईमानदार व्यक्ति है।",e:"He is an honest person.",d:"medium"},
  {h:"मैं अपने काम में समर्पित हूँ।",e:"I am dedicated to my work.",d:"medium"},
  {h:"हम एक समर्पित टीम हैं।",e:"We are a dedicated team.",d:"medium"},
  {h:"यह एक नई परियोजना है।",e:"It is a new project.",d:"medium"},
  {h:"वह हमारे नए सहकर्मी हैं।",e:"He is our new colleague.",d:"medium"},
  // Formal/interview level hard sentences
  {h:"मैं इस पद के लिए सबसे उपयुक्त उम्मीदवार हूँ।",e:"I am the most suitable candidate for this position.",d:"hard"},
  {h:"वह एक बेहद अनुभवी पेशेवर है।",e:"She is a highly experienced professional.",d:"hard"},
  {h:"हम ग्राहक सेवा के प्रति प्रतिबद्ध हैं।",e:"We are committed to customer service.",d:"hard"},
  {h:"यह कंपनी बहुत प्रतिष्ठित है।",e:"This company is very reputable.",d:"hard"},
  {h:"वे बाज़ार में अग्रणी हैं।",e:"They are leaders in the market.",d:"hard"},
  {h:"मेरा लक्ष्य स्पष्ट है।",e:"My goal is clear.",d:"hard"},
  {h:"मेरी योग्यता इस भूमिका के लिए उपयुक्त है।",e:"My qualification is suitable for this role.",d:"hard"},
  {h:"वह अपने क्षेत्र में विशेषज्ञ है।",e:"He is an expert in his field.",d:"hard"},
  {h:"मैं टीम वर्क में विश्वास रखता हूँ।",e:"I am a believer in teamwork.",d:"hard"},
  {h:"यह निर्णय सही था।",e:"This decision was correct.",d:"hard"},
  {h:"हम परिवर्तन के लिए तैयार हैं।",e:"We are ready for change.",d:"hard"},
  {h:"वह अपने कार्य में बहुत कुशल है।",e:"She is very skilled in her work.",d:"hard"},
  {h:"मैं समय प्रबंधन में अच्छा हूँ।",e:"I am good at time management.",d:"hard"},
  {h:"यह परियोजना बहुत महत्त्वपूर्ण है।",e:"This project is very important.",d:"hard"},
  {h:"हम अपने लक्ष्य के करीब हैं।",e:"We are close to our goal.",d:"hard"},
  // More daily life contexts
  {h:"बाज़ार पास में है।",e:"The market is nearby.",d:"easy"},
  {h:"स्कूल दूर है।",e:"The school is far.",d:"easy"},
  {h:"मेरा घर छोटा है।",e:"My house is small.",d:"easy"},
  {h:"उसका घर बड़ा है।",e:"His house is big.",d:"easy"},
  {h:"मेरी माँ घर पर हैं।",e:"My mother is at home.",d:"easy"},
  {h:"मेरे पिता ऑफिस में हैं।",e:"My father is at the office.",d:"easy"},
  {h:"मेरा दोस्त दिल्ली में है।",e:"My friend is in Delhi.",d:"easy"},
  {h:"बच्चे स्कूल में हैं।",e:"The children are at school.",d:"easy"},
  {h:"छात्र कक्षा में हैं।",e:"The students are in the classroom.",d:"easy"},
  {h:"शिक्षक थके हुए हैं।",e:"The teachers are tired.",d:"easy"},
  {h:"डॉक्टर अस्पताल में है।",e:"The doctor is at the hospital.",d:"easy"},
  {h:"दुकानदार दुकान पर है।",e:"The shopkeeper is at the shop.",d:"easy"},
  {h:"मेरी बहन सुंदर है।",e:"My sister is beautiful.",d:"easy"},
  {h:"मेरा भाई होशियार है।",e:"My brother is smart.",d:"easy"},
  {h:"मेरे दादाजी बूढ़े हैं।",e:"My grandfather is old.",d:"easy"},
  {h:"मेरी दादी बहुत दयालु हैं।",e:"My grandmother is very kind.",d:"easy"},
  {h:"मेरा बेटा छोटा है।",e:"My son is small.",d:"easy"},
  {h:"मेरी बेटी जवान है।",e:"My daughter is young.",d:"easy"},
  {h:"हमारा मकान मालिक सख्त है।",e:"Our landlord is strict.",d:"medium"},
  {h:"पड़ोसी बहुत अच्छे हैं।",e:"The neighbors are very good.",d:"easy"},
  // Demonstrative with be verb
  {h:"यह मेरी किताब है।",e:"This is my book.",d:"easy"},
  {h:"वह उसकी कार है।",e:"That is his car.",d:"easy"},
  {h:"ये मेरी किताबें हैं।",e:"These are my books.",d:"easy"},
  {h:"वे उनके बैग हैं।",e:"Those are their bags.",d:"easy"},
  {h:"यह मेरा पेन है।",e:"This is my pen.",d:"easy"},
  {h:"वह मेरा घर है।",e:"That is my house.",d:"easy"},
  {h:"ये मेरे दोस्त हैं।",e:"These are my friends.",d:"easy"},
  {h:"वे हमारे शिक्षक हैं।",e:"Those are our teachers.",d:"easy"},
  {h:"यह एक अच्छा अवसर है।",e:"This is a good opportunity.",d:"medium"},
  {h:"यह एक नई शुरुआत है।",e:"This is a new beginning.",d:"medium"},
  // Age expressions
  {h:"वह 10 साल की है।",e:"She is 10 years old.",d:"easy"},
  {h:"वह 50 साल का है।",e:"He is 50 years old.",d:"easy"},
  {h:"मेरी माँ 45 साल की हैं।",e:"My mother is 45 years old.",d:"easy"},
  {h:"तुम कितने साल के हो?",e:"How old are you?",d:"medium"},
  {h:"वह पिछले साल 20 साल का था।",e:"He was 20 years old last year.",d:"medium"},
  // Intensifiers with be verb
  {h:"यह बहुत महँगा है।",e:"It is very expensive.",d:"easy"},
  {h:"वह बहुत दयालु है।",e:"She is very kind.",d:"easy"},
  {h:"मैं बहुत खुश हूँ।",e:"I am very happy.",d:"easy"},
  {h:"यह बिल्कुल सही है।",e:"It is absolutely correct.",d:"medium"},
  {h:"वह इतना होशियार है।",e:"He is so smart.",d:"medium"},
  {h:"मैं सच में गर्वित हूँ।",e:"I am really proud.",d:"medium"},
  {h:"यह बहुत ज़्यादा गर्म है।",e:"It is too hot.",d:"easy"},
  {h:"वह काफी लंबा है।",e:"He is quite tall.",d:"medium"},
  // State/feeling variety
  {h:"मैं उत्सुक हूँ।",e:"I am eager.",d:"medium"},
  {h:"वह निराश है।",e:"He is disappointed.",d:"medium"},
  {h:"वह चिंतित है।",e:"She is worried.",d:"medium"},
  {h:"मैं आभारी हूँ।",e:"I am grateful.",d:"medium"},
  {h:"वह हैरान है।",e:"He is surprised.",d:"medium"},
  {h:"मैं शर्मिंदा हूँ।",e:"I am embarrassed.",d:"medium"},
  {h:"वह ईर्ष्यालु है।",e:"She is jealous.",d:"medium"},
  {h:"मैं संतुष्ट हूँ।",e:"I am satisfied.",d:"medium"},
  {h:"वह हताश है।",e:"He is frustrated.",d:"medium"},
  {h:"मैं शांत हूँ।",e:"I am calm.",d:"medium"},
  {h:"वह उत्साहित है।",e:"She is enthusiastic.",d:"medium"},
  {h:"मैं सावधान हूँ।",e:"I am careful.",d:"medium"},
  {h:"वह लापरवाह है।",e:"He is careless.",d:"medium"},
  {h:"मैं धैर्यवान हूँ।",e:"I am patient.",d:"medium"},
  {h:"वह अधीर है।",e:"She is impatient.",d:"medium"},
  {h:"मैं आश्वस्त हूँ।",e:"I am assured.",d:"hard"},
  {h:"वह प्रेरित है।",e:"He is motivated.",d:"medium"},
  {h:"मैं प्रतिबद्ध हूँ।",e:"I am committed.",d:"medium"},
  {h:"वह अनुशासित है।",e:"She is disciplined.",d:"medium"},
  {h:"मैं केंद्रित हूँ।",e:"I am focused.",d:"medium"},
  // More nationalities/locations
  {h:"वह अमेरिकी है।",e:"He is American.",d:"easy"},
  {h:"वह ब्रिटिश है।",e:"She is British.",d:"easy"},
  {h:"वे जापानी हैं।",e:"They are Japanese.",d:"easy"},
  {h:"वह मुंबई से है।",e:"He is from Mumbai.",d:"easy"},
  {h:"वह चेन्नई में है।",e:"She is in Chennai.",d:"easy"},
  {h:"हम बेंगलुरु में हैं।",e:"We are in Bengaluru.",d:"easy"},
  {h:"वे हैदराबाद में हैं।",e:"They are in Hyderabad.",d:"easy"},
  // Occupations - more variety
  {h:"वह एक पुलिसकर्मी है।",e:"He is a policeman.",d:"easy"},
  {h:"वह एक फ़ोटोग्राफर है।",e:"She is a photographer.",d:"easy"},
  {h:"वह एक वास्तुकार है।",e:"He is an architect.",d:"medium"},
  {h:"वह एक वैज्ञानिक है।",e:"She is a scientist.",d:"medium"},
  {h:"वह एक लेखक है।",e:"He is a writer.",d:"easy"},
  {h:"वह एक पत्रकार है।",e:"She is a journalist.",d:"medium"},
  {h:"वह एक अकाउंटेंट है।",e:"He is an accountant.",d:"medium"},
  {h:"वह एक प्रोफ़ेसर है।",e:"She is a professor.",d:"medium"},
  {h:"वह एक रसोइया है।",e:"He is a chef.",d:"easy"},
  {h:"वह एक दंत चिकित्सक है।",e:"She is a dentist.",d:"medium"},
  {h:"वह एक फार्मासिस्ट है।",e:"He is a pharmacist.",d:"medium"},
  {h:"वह एक कोच है।",e:"She is a coach.",d:"easy"},
  {h:"वह एक ट्रेनर है।",e:"He is a trainer.",d:"easy"},
  {h:"वह एक ड्राइवर है।",e:"She is a driver.",d:"easy"},
  {h:"वह एक प्लंबर है।",e:"He is a plumber.",d:"easy"},
  {h:"वह एक इलेक्ट्रीशियन है।",e:"She is an electrician.",d:"medium"},
  // Additional daily life
  {h:"मौसम आज बहुत अच्छा है।",e:"The weather is very good today.",d:"easy"},
  {h:"सड़क व्यस्त है।",e:"The road is busy.",d:"easy"},
  {h:"ट्रैफ़िक बहुत बुरा है।",e:"The traffic is very bad.",d:"easy"},
  {h:"खाना बहुत स्वादिष्ट है।",e:"The food is very delicious.",d:"easy"},
  {h:"पार्क बहुत सुंदर है।",e:"The park is very beautiful.",d:"easy"},
  {h:"नदी बहुत बड़ी है।",e:"The river is very large.",d:"easy"},
  {h:"पहाड़ बहुत ऊँचा है।",e:"The mountain is very high.",d:"easy"},
  {h:"समुद्र गहरा है।",e:"The ocean is deep.",d:"easy"},
  {h:"आसमान साफ़ है।",e:"The sky is clear.",d:"easy"},
  {h:"रात ठंडी है।",e:"The night is cold.",d:"easy"},
  {h:"दिन गर्म है।",e:"The day is hot.",d:"easy"},
  {h:"सुबह ताज़ी है।",e:"The morning is fresh.",d:"medium"},
  {h:"शाम सुहावनी है।",e:"The evening is pleasant.",d:"medium"},
  // Past - more variety
  {h:"बाज़ार कल बंद था।",e:"The market was closed yesterday.",d:"medium"},
  {h:"दफ़्तर कल खाली था।",e:"The office was empty yesterday.",d:"medium"},
  {h:"वह पिछले साल एक छात्रा थी।",e:"She was a student last year.",d:"medium"},
  {h:"बचपन में हम बहुत खुश थे।",e:"We were very happy in childhood.",d:"medium"},
  {h:"वह उस समय बहुत मशहूर था।",e:"He was very famous at that time.",d:"medium"},
  {h:"पिछले हफ्ते मीटिंग लंबी थी।",e:"The meeting was long last week.",d:"medium"},
  {h:"परीक्षा कठिन थी।",e:"The exam was difficult.",d:"medium"},
  {h:"सवाल आसान था।",e:"The question was easy.",d:"medium"},
  {h:"फ़िल्म उबाऊ थी।",e:"The movie was boring.",d:"medium"},
  {h:"कहानी दिलचस्प थी।",e:"The story was interesting.",d:"medium"},
  {h:"खाना स्वादिष्ट था।",e:"The food was delicious.",d:"medium"},
  {h:"कल मौसम ख़राब था।",e:"The weather was bad yesterday.",d:"medium"},
  {h:"घर साफ़ था।",e:"The house was clean.",d:"medium"},
  {h:"वे पिछले साल खुश थे।",e:"They were happy last year.",d:"medium"},
  {h:"वह पिछले महीने बीमार था।",e:"He was sick last month.",d:"medium"},
  // Formal/interview sentences
  {h:"मैं एक कुशल संचारक हूँ।",e:"I am a skilled communicator.",d:"hard"},
  {h:"मैं टीम में काम करने में सक्षम हूँ।",e:"I am capable of working in a team.",d:"hard"},
  {h:"वह एक जिम्मेदार नेता है।",e:"She is a responsible leader.",d:"hard"},
  {h:"हम ग्राहकों की सेवा के लिए प्रतिबद्ध हैं।",e:"We are committed to serving customers.",d:"hard"},
  {h:"यह एक अच्छी कंपनी है।",e:"This is a good company.",d:"medium"},
  {h:"वह एक प्रेरक वक्ता है।",e:"He is a motivational speaker.",d:"hard"},
  {h:"मैं अपने करियर के प्रति गंभीर हूँ।",e:"I am serious about my career.",d:"hard"},
  {h:"वह एक अनुभवी प्रोजेक्ट मैनेजर है।",e:"She is an experienced project manager.",d:"hard"},
  {h:"हम एक बहुराष्ट्रीय कंपनी हैं।",e:"We are a multinational company.",d:"hard"},
  {h:"यह पद मेरे लिए उपयुक्त है।",e:"This position is suitable for me.",d:"hard"},
];

function buildPQ(pairs) {
  const qs = [];
  let id = 1;
  const diffs = ['easy','medium','hard'];
  const tagSets = [['be-verb'],['be-verb','present'],['be-verb','past'],['be-verb','negative'],['be-verb','question'],['be-verb','office'],['be-verb','identity'],['be-verb','location'],['be-verb','state'],['be-verb','description']];
  const categories = ['be verb practice','am/is/are practice','was/were practice','negative be verb','question formation','be verb - identity','be verb - location','be verb - description','be verb - state','office & professional'];
  const hints = [
    'Use correct form of be verb (am/is/are/was/were) based on subject.',
    'Subject "I" uses "am"; He/She/It uses "is"; You/We/They use "are".',
    'Past tense: was for I/He/She/It; were for You/We/They.',
    'Negative: add "not" after the be verb.',
    'Question: invert subject and be verb.',
    'Present tense be verbs: am, is, are.',
    'Past tense be verbs: was, were.',
    'Contractions: I\'m = I am, He\'s = He is, They\'re = They are.',
    'Be verb expresses identity, state, location, or description.',
    'For plural subjects (we/they), use "are" (present) or "were" (past).',
  ];

  for (const p of pairs) {
    const hi = hints[qs.length % hints.length];
    const ti = tagSets[qs.length % tagSets.length];
    const ci = categories[qs.length % categories.length];
    qs.push({
      id: id++,
      hindi: p.h,
      english: p.e,
      alternatives: [],
      hint: hi,
      explanation: `Correct sentence: "${p.e}"`,
      difficulty: p.d || diffs[qs.length % 3],
      tags: ti,
      grammarRule: 'Be Verb',
      category: ci
    });
  }
  return qs;
}

// We need 950 questions. Core has ~310. We'll generate variations systematically.
// Add more variants by expanding subjects, adjectives, occupations, locations

const subjects_present = [
  {sub:'मेरा दोस्त',pro:'My friend',verb:'is'},
  {sub:'मेरी बहन',pro:'My sister',verb:'is'},
  {sub:'मेरा भाई',pro:'My brother',verb:'is'},
  {sub:'मेरी माँ',pro:'My mother',verb:'is'},
  {sub:'मेरे पिताजी',pro:'My father',verb:'is'},
  {sub:'हमारा बॉस',pro:'Our boss',verb:'is'},
  {sub:'यह छात्र',pro:'This student',verb:'is'},
  {sub:'वह लड़की',pro:'That girl',verb:'is'},
  {sub:'वह लड़का',pro:'That boy',verb:'is'},
  {sub:'हमारी टीम',pro:'Our team',verb:'is'},
  {sub:'यह कमरा',pro:'This room',verb:'is'},
  {sub:'वह नौकरी',pro:'That job',verb:'is'},
  {sub:'यह काम',pro:'This work',verb:'is'},
  {sub:'हमारा दफ़्तर',pro:'Our office',verb:'is'},
  {sub:'वह शहर',pro:'That city',verb:'is'},
];

const subjects_plural = [
  {sub:'सभी छात्र',pro:'All students',verb:'are'},
  {sub:'मेरे सहकर्मी',pro:'My colleagues',verb:'are'},
  {sub:'हमारे ग्राहक',pro:'Our clients',verb:'are'},
  {sub:'वे बच्चे',pro:'Those children',verb:'are'},
  {sub:'ये लोग',pro:'These people',verb:'are'},
  {sub:'मेरे दोस्त',pro:'My friends',verb:'are'},
  {sub:'हमारे शिक्षक',pro:'Our teachers',verb:'are'},
  {sub:'वे इंजीनियर',pro:'Those engineers',verb:'are'},
];

const adjectives = [
  {h:'खुश',e:'happy'},{h:'उदास',e:'sad'},{h:'थका हुआ',e:'tired'},
  {h:'व्यस्त',e:'busy'},{h:'तैयार',e:'ready'},{h:'स्वस्थ',e:'healthy'},
  {h:'बीमार',e:'sick'},{h:'अनुपस्थित',e:'absent'},{h:'उपस्थित',e:'present'},
  {h:'देर से',e:'late'},{h:'जल्दी',e:'early'},{h:'सही',e:'right'},
  {h:'गलत',e:'wrong'},{h:'होशियार',e:'smart'},{h:'दयालु',e:'kind'},
  {h:'घबराया हुआ',e:'nervous'},{h:'उत्साहित',e:'excited'},{h:'गर्वित',e:'proud'},
  {h:'शांत',e:'calm'},{h:'गंभीर',e:'serious'},{h:'प्रेरित',e:'motivated'},
  {h:'आत्मविश्वासी',e:'confident'},{h:'समर्पित',e:'dedicated'},{h:'अनुशासित',e:'disciplined'},
  {h:'केंद्रित',e:'focused'},{h:'संतुष्ट',e:'satisfied'},{h:'आभारी',e:'grateful'},
  {h:'चिंतित',e:'worried'},{h:'हैरान',e:'surprised'},{h:'निराश',e:'disappointed'},
  {h:'प्रतिबद्ध',e:'committed'},{h:'उत्सुक',e:'eager'},{h:'धैर्यवान',e:'patient'},
];

const occupations = [
  {h:'एक डॉक्टर',e:'a doctor'},{h:'एक शिक्षक',e:'a teacher'},
  {h:'एक इंजीनियर',e:'an engineer'},{h:'एक वकील',e:'a lawyer'},
  {h:'एक मैनेजर',e:'a manager'},{h:'एक नर्स',e:'a nurse'},
  {h:'एक पायलट',e:'a pilot'},{h:'एक व्यापारी',e:'a businessman'},
  {h:'एक लेखाकार',e:'an accountant'},{h:'एक वास्तुकार',e:'an architect'},
  {h:'एक वैज्ञानिक',e:'a scientist'},{h:'एक पत्रकार',e:'a journalist'},
  {h:'एक फ़ोटोग्राफर',e:'a photographer'},{h:'एक शेफ़',e:'a chef'},
  {h:'एक प्रोफ़ेसर',e:'a professor'},{h:'एक डिज़ाइनर',e:'a designer'},
  {h:'एक सलाहकार',e:'a consultant'},{h:'एक विश्लेषक',e:'an analyst'},
  {h:'एक डेवलपर',e:'a developer'},{h:'एक टीम लीडर',e:'a team leader'},
];

const locations_h = [
  {h:'घर पर',e:'at home'},{h:'ऑफिस में',e:'at the office'},
  {h:'स्कूल में',e:'at school'},{h:'बाज़ार में',e:'at the market'},
  {h:'अस्पताल में',e:'at the hospital'},{h:'दिल्ली में',e:'in Delhi'},
  {h:'मुंबई में',e:'in Mumbai'},{h:'बैठक में',e:'in a meeting'},
  {h:'ट्रेन में',e:'on the train'},{h:'रास्ते में',e:'on the way'},
  {h:'बाहर',e:'outside'},{h:'अंदर',e:'inside'},
  {h:'यहाँ',e:'here'},{h:'वहाँ',e:'there'},
];

const extra = [];

// Generate: subject + adj (present)
for (const s of subjects_present) {
  for (const a of adjectives) {
    extra.push({h:`${s.sub} ${a.h} ${s.verb==='is'?'है।':'हैं।'}`, e:`${s.pro} ${s.verb} ${a.e}.`, d:'medium'});
    if (extra.length > 450) break;
  }
  if (extra.length > 450) break;
}

// Generate: plural subject + adj
for (const s of subjects_plural) {
  for (const a of adjectives.slice(0,20)) {
    extra.push({h:`${s.sub} ${a.h} ${s.verb==='are'?'हैं।':'हैं।'}`, e:`${s.pro} ${s.verb} ${a.e}.`, d:'medium'});
    if (extra.length > 700) break;
  }
  if (extra.length > 700) break;
}

// Generate: subject + occupation
for (const s of subjects_present) {
  for (const o of occupations) {
    extra.push({h:`${s.sub} ${o.h} ${s.verb==='is'?'है।':'हैं।'}`, e:`${s.pro} ${s.verb} ${o.e}.`, d:'easy'});
    if (extra.length > 900) break;
  }
  if (extra.length > 900) break;
}

// Generate: subject + location (present)
for (const s of subjects_present) {
  for (const l of locations_h) {
    extra.push({h:`${s.sub} ${l.h} ${s.verb==='is'?'है।':'हैं।'}`, e:`${s.pro} ${s.verb} ${l.e}.`, d:'easy'});
    if (extra.length > 1050) break;
  }
  if (extra.length > 1050) break;
}

// Generate negative: was/were
const subj_past = [
  {h:'मेरा दोस्त',e:'My friend',v:'was'},
  {h:'वह लड़की',e:'That girl',v:'was'},
  {h:'यह परियोजना',e:'This project',v:'was'},
  {h:'हमारी टीम',e:'Our team',v:'was'},
  {h:'वे लोग',e:'Those people',v:'were'},
  {h:'मेरे सहकर्मी',e:'My colleagues',v:'were'},
];
for (const s of subj_past) {
  for (const a of adjectives.slice(0,15)) {
    extra.push({h:`${s.h} ${s.v==='was'?'पहले':''} ${a.h} ${s.v==='was'?'था।':'थे।'}`, e:`${s.e} ${s.v} ${a.e}.`, d:'medium'});
    if (extra.length > 1150) break;
  }
  if (extra.length > 1150) break;
}

const allPairs = [...corePairs, ...extra];
const pqItems = buildPQ(allPairs.slice(0, 950));

const pqOut = {
  day: 4,
  topic: "Be Verb (Am, Is, Are, Was, Were)",
  totalQuestions: pqItems.length,
  questions: pqItems
};

fs.writeFileSync(path.join(BASE,'practice-questions.json'), JSON.stringify(pqOut, null, 2));
console.log('practice-questions.json written:', pqItems.length);

// ============================================================
// VOCABULARY - target 950 words
// ============================================================

// The existing file uses a different schema (simpler). The task asks for the richer schema:
// id, word, hindi, simpleMeaning, ipa, verbForms, synonyms, antonyms, 
// sentences{daily,office,interview,business,formal,informal}, usageNote, cefrLevel
// We'll adopt the richer schema per day-02 reference.

const vocabData = [
  // Be verbs core
  {w:'am',h:'हूँ',sm:'first person singular present form of "be"',ipa:'/æm/',vf:{base:'be',s3:'is',ing:'being',past:'was',pp:'been'},syn:['is','are'],ant:[],daily:'I am a student.',office:'I am currently working on the report.',interview:'I am confident about my skills.',business:'I am the point of contact for this deal.',formal:'I am honored to accept this award.',informal:'I\'m so tired right now!',un:'Used only with "I" in present tense.',cefr:'A1'},
  {w:'is',h:'है',sm:'third person singular present form of "be"',ipa:'/ɪz/',vf:{base:'be',s3:'is',ing:'being',past:'was',pp:'been'},syn:['am','are'],ant:[],daily:'She is my teacher.',office:'He is our project manager.',interview:'The role is very suitable for me.',business:'The deadline is next Friday.',formal:'He is the chief executive officer.',informal:'She\'s so funny!',un:'Used with He/She/It in present tense.',cefr:'A1'},
  {w:'are',h:'हैं/हो',sm:'second person and plural present form of "be"',ipa:'/ɑːr/',vf:{base:'be',s3:'is',ing:'being',past:'were',pp:'been'},syn:['am','is'],ant:[],daily:'You are my best friend.',office:'We are ready for the presentation.',interview:'You are a strong candidate.',business:'They are our biggest clients.',formal:'We are pleased to inform you.',informal:'You\'re amazing!',un:'Used with You/We/They in present tense.',cefr:'A1'},
  {w:'was',h:'था/थी',sm:'first and third person singular past form of "be"',ipa:'/wɒz/',vf:{base:'be',s3:'is',ing:'being',past:'was',pp:'been'},syn:['were'],ant:[],daily:'I was sick yesterday.',office:'He was absent on Monday.',interview:'I was a top performer at my last company.',business:'The meeting was very productive.',formal:'She was appointed as director last year.',informal:'I was so nervous, you know!',un:'Used with I/He/She/It in past tense.',cefr:'A1'},
  {w:'were',h:'थे/थीं',sm:'second person and plural past form of "be"',ipa:'/wɜːr/',vf:{base:'be',s3:'is',ing:'being',past:'were',pp:'been'},syn:['was'],ant:[],daily:'We were friends in college.',office:'They were present at the meeting.',interview:'You were recommended by your manager.',business:'Clients were satisfied with the service.',formal:'They were awarded for their contributions.',informal:'We were just hanging out!',un:'Used with You/We/They in past tense.',cefr:'A1'},
  {w:'been',h:'रहा/रही हूँ',sm:'past participle of "be", used with have/has/had',ipa:'/biːn/',vf:{base:'be',s3:'is',ing:'being',past:'was/were',pp:'been'},syn:[],ant:[],daily:'I have been here for two hours.',office:'She has been working here for five years.',interview:'I have been in sales for three years.',business:'We have been partners for a decade.',formal:'He has been honored for his service.',informal:'I\'ve been waiting forever!',un:'Used in perfect tenses: has/have/had been.',cefr:'A2'},
  {w:'being',h:'होना/हो रहा है',sm:'present participle of "be", used in continuous tenses',ipa:'/ˈbiːɪŋ/',vf:{base:'be',s3:'is',ing:'being',past:'was/were',pp:'been'},syn:[],ant:[],daily:'Stop being so lazy.',office:'You are being very helpful today.',interview:'I enjoy being part of a team.',business:'Being professional is essential here.',formal:'The matter is being reviewed.',informal:'You\'re being funny again!',un:'Used in passive and continuous constructions.',cefr:'A2'},
  // Adjectives - states and emotions
  {w:'happy',h:'खुश',sm:'feeling or showing pleasure or contentment',ipa:'/ˈhæpi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['joyful','pleased','content'],ant:['sad','unhappy'],daily:'I am happy with my results.',office:'The team is happy about the new project.',interview:'I am happy to be here for this interview.',business:'Clients are happy with our service.',formal:'We are happy to announce this partnership.',informal:'I\'m so happy right now!',un:'"Happy about/with" something; "happy to" + verb.',cefr:'A1'},
  {w:'sad',h:'उदास',sm:'feeling sorrow or unhappiness',ipa:'/sæd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['unhappy','sorrowful','upset'],ant:['happy','cheerful'],daily:'She is sad because her friend left.',office:'The team is sad about the layoffs.',interview:'-',business:'-',formal:'It is sad to hear of his passing.',informal:'Why are you so sad today?',un:'"Sad about" something.',cefr:'A1'},
  {w:'tired',h:'थका हुआ',sm:'feeling a need to rest or sleep',ipa:'/ˈtaɪərd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['exhausted','weary','fatigued'],ant:['energetic','fresh'],daily:'I am tired after work.',office:'She is tired from the long meeting.',interview:'-',business:'-',formal:'He was tired but continued his duty.',informal:'I\'m dead tired, man!',un:'"Tired of" doing something means fed up.',cefr:'A1'},
  {w:'busy',h:'व्यस्त',sm:'having a lot of work or activity to do',ipa:'/ˈbɪzi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['occupied','engaged','hectic'],ant:['free','idle'],daily:'I am busy with housework.',office:'She is busy in a conference call.',interview:'I am always busy with productive activities.',business:'We are busy with year-end closing.',formal:'He was too busy to attend.',informal:'I\'m crazy busy this week!',un:'"Busy with" something.',cefr:'A1'},
  {w:'ready',h:'तैयार',sm:'fully prepared for something',ipa:'/ˈrɛdi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['prepared','set','all set'],ant:['unprepared','unready'],daily:'I am ready to leave.',office:'The report is ready for review.',interview:'I am ready to take on new challenges.',business:'We are ready to sign the contract.',formal:'The team is ready for deployment.',informal:'You ready? Let\'s go!',un:'"Ready for" something or "ready to" + verb.',cefr:'A1'},
  {w:'sick',h:'बीमार',sm:'affected by illness or disease',ipa:'/sɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['ill','unwell','ailing'],ant:['healthy','well'],daily:'I was sick last week.',office:'He is sick and will not come to office.',interview:'-',business:'-',formal:'She is sick and has been granted leave.',informal:'I feel sick, skipping class.',un:'"Sick of" means fed up (informal).',cefr:'A1'},
  {w:'healthy',h:'स्वस्थ',sm:'in good physical or mental condition',ipa:'/ˈhɛlθi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fit','well','robust'],ant:['sick','unhealthy'],daily:'I am healthy because I exercise.',office:'-',interview:'-',business:'-',formal:'A healthy workforce is productive.',informal:'Stay healthy, bro!',un:'Adjective, often used with "be verb".',cefr:'A1'},
  {w:'hungry',h:'भूखा',sm:'feeling the need to eat food',ipa:'/ˈhʌŋɡri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['starving','famished'],ant:['full','satisfied'],daily:'I am hungry, let\'s eat.',office:'-',interview:'-',business:'-',formal:'-',informal:'I\'m starving! Am so hungry.',un:'"Hungry for" success = metaphorical.',cefr:'A1'},
  {w:'thirsty',h:'प्यासा',sm:'feeling the need to drink something',ipa:'/ˈθɜːrsti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['parched'],ant:['quenched'],daily:'I am thirsty, please get me some water.',office:'-',interview:'-',business:'-',formal:'-',informal:'So thirsty after that run!',un:'"Thirsty for" knowledge = metaphorical.',cefr:'A1'},
  {w:'nervous',h:'घबराया हुआ',sm:'anxious or worried about something upcoming',ipa:'/ˈnɜːrvəs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['anxious','worried','tense'],ant:['calm','relaxed'],daily:'I am nervous about my exam.',office:'She is nervous before the presentation.',interview:'I am a little nervous but very excited.',business:'-',formal:'The candidate appeared nervous.',informal:'I\'m so nervous right now!',un:'"Nervous about" something.',cefr:'A2'},
  {w:'excited',h:'उत्साहित',sm:'feeling enthusiastic and eager about something',ipa:'/ɪkˈsaɪtɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['enthusiastic','thrilled','eager'],ant:['bored','indifferent'],daily:'I am excited about the trip.',office:'The team is excited about the new project.',interview:'I am excited about this opportunity.',business:'We are excited to launch our new product.',formal:'We are excited to announce this initiative.',informal:'Oh my, I\'m so excited!',un:'"Excited about" something.',cefr:'A2'},
  {w:'bored',h:'ऊबा हुआ',sm:'feeling uninterested and lacking excitement',ipa:'/bɔːrd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['uninterested','tedious'],ant:['excited','interested'],daily:'I am bored at home.',office:'He is bored with repetitive tasks.',interview:'-',business:'-',formal:'-',informal:'So bored right now, nothing to do.',un:'"Bored of/with" something.',cefr:'A2'},
  {w:'angry',h:'गुस्से में',sm:'feeling strong displeasure or annoyance',ipa:'/ˈæŋɡri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['furious','annoyed','irritated'],ant:['calm','pleased'],daily:'I am angry with him.',office:'The boss was angry about the delay.',interview:'-',business:'-',formal:'He was angry at the breach of contract.',informal:'I\'m so angry right now!',un:'"Angry with" a person, "angry about" a situation.',cefr:'A1'},
  {w:'proud',h:'गर्वित',sm:'feeling pleasure from one\'s own achievements',ipa:'/praʊd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['pleased','satisfied'],ant:['ashamed'],daily:'I am proud of my daughter.',office:'The manager is proud of the team.',interview:'I am proud of my work ethic.',business:'We are proud of our achievements.',formal:'He is proud to represent the organization.',informal:'I\'m so proud of you!',un:'"Proud of" someone/something.',cefr:'A2'},
  {w:'confident',h:'आत्मविश्वासी',sm:'sure of one\'s own abilities',ipa:'/ˈkɒnfɪdənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['self-assured','bold','certain'],ant:['nervous','insecure'],daily:'I am confident in my abilities.',office:'She is confident about the presentation.',interview:'I am confident I can do this job.',business:'We are confident in our product.',formal:'He is a confident and capable leader.',informal:'I\'m super confident about this!',un:'"Confident about/in" something.',cefr:'A2'},
  {w:'calm',h:'शांत',sm:'not showing nervousness or excitement',ipa:'/kɑːm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['relaxed','composed','peaceful'],ant:['nervous','agitated'],daily:'I am calm in difficult situations.',office:'Stay calm during the client call.',interview:'I am calm and focused under pressure.',business:'A calm approach leads to better decisions.',formal:'He remained calm throughout the crisis.',informal:'Just stay calm, okay?',un:'"Calm" is also a verb: to calm someone down.',cefr:'B1'},
  {w:'serious',h:'गंभीर',sm:'thoughtful and not playful; important',ipa:'/ˈsɪəriəs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['grave','solemn','earnest'],ant:['playful','casual'],daily:'I am serious about my studies.',office:'This is a serious issue.',interview:'I am serious about my career growth.',business:'We take customer complaints very seriously.',formal:'The matter is of a serious nature.',informal:'Are you serious right now?',un:'"Serious about" something.',cefr:'A2'},
  {w:'grateful',h:'आभारी',sm:'feeling thankful for a benefit received',ipa:'/ˈɡreɪtfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['thankful','appreciative'],ant:['ungrateful'],daily:'I am grateful for your help.',office:'The team is grateful for the support.',interview:'I am grateful for this opportunity.',business:'We are grateful for your patronage.',formal:'I am deeply grateful for your contribution.',informal:'I\'m so grateful, thank you!',un:'"Grateful for" something.',cefr:'B1'},
  {w:'motivated',h:'प्रेरित',sm:'having a strong desire to do something',ipa:'/ˈmoʊtɪveɪtɪd/',vf:{base:'motivate',s3:'motivates',ing:'motivating',past:'motivated',pp:'motivated'},syn:['inspired','driven'],ant:['unmotivated','apathetic'],daily:'I am motivated to learn English.',office:'The team is highly motivated.',interview:'I am a self-motivated individual.',business:'We are motivated to deliver results.',formal:'He is motivated by a desire to serve.',informal:'Stay motivated, don\'t give up!',un:'"Self-motivated" is a common interview phrase.',cefr:'B1'},
  {w:'dedicated',h:'समर्पित',sm:'wholly committed to a task or purpose',ipa:'/ˈdedɪkeɪtɪd/',vf:{base:'dedicate',s3:'dedicates',ing:'dedicating',past:'dedicated',pp:'dedicated'},syn:['committed','devoted'],ant:['careless','negligent'],daily:'I am dedicated to improving every day.',office:'She is dedicated to her work.',interview:'I am a dedicated and hardworking person.',business:'We are dedicated to quality.',formal:'He is dedicated to public service.',informal:'She\'s really dedicated, respect!',un:'"Dedicated to" + noun/gerund.',cefr:'B1'},
  {w:'focused',h:'केंद्रित',sm:'giving all attention to one thing',ipa:'/ˈfoʊkəst/',vf:{base:'focus',s3:'focuses',ing:'focusing',past:'focused',pp:'focused'},syn:['concentrated','attentive'],ant:['distracted'],daily:'I am focused on my goal.',office:'Stay focused during the meeting.',interview:'I am focused on delivering results.',business:'Our team is focused on growth.',formal:'He remained focused under pressure.',informal:'Stay focused, don\'t lose track.',un:'"Focused on" something.',cefr:'B1'},
  {w:'committed',h:'प्रतिबद्ध',sm:'dedicated to a cause or activity',ipa:'/kəˈmɪtɪd/',vf:{base:'commit',s3:'commits',ing:'committing',past:'committed',pp:'committed'},syn:['dedicated','devoted'],ant:['uncommitted'],daily:'I am committed to my health goals.',office:'We are committed to this project.',interview:'I am committed to continuous learning.',business:'We are committed to customer satisfaction.',formal:'He is committed to the highest standards.',informal:'I\'m totally committed to this.',un:'"Committed to" + noun/gerund.',cefr:'B1'},
  {w:'disciplined',h:'अनुशासित',sm:'following rules and controlling behavior',ipa:'/ˈdɪsəplɪnd/',vf:{base:'discipline',s3:'disciplines',ing:'disciplining',past:'disciplined',pp:'disciplined'},syn:['orderly','controlled'],ant:['undisciplined','unruly'],daily:'I am disciplined about my schedule.',office:'A disciplined team performs better.',interview:'I am disciplined and punctual.',business:'-',formal:'He is a disciplined and professional leader.',informal:'You\'re so disciplined, I admire that.',un:'Adjective form of "discipline".',cefr:'B1'},
  {w:'patient',h:'धैर्यवान',sm:'able to wait calmly without getting annoyed',ipa:'/ˈpeɪʃənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['tolerant','calm'],ant:['impatient','hasty'],daily:'I am patient with children.',office:'Be patient with the new employee.',interview:'I am patient and a good listener.',business:'Good customer service requires patience.',formal:'A good leader is patient.',informal:'Just be patient, it\'ll happen!',un:'"Patient with" a person; also a noun (medical).',cefr:'A2'},
  {w:'impatient',h:'अधीर',sm:'easily annoyed by waiting',ipa:'/ɪmˈpeɪʃənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['restless','hasty'],ant:['patient','calm'],daily:'I am impatient when lines are long.',office:'He is impatient with slow progress.',interview:'-',business:'-',formal:'-',informal:'Stop being so impatient!',un:'"Impatient with" someone.',cefr:'B1'},
  {w:'worried',h:'चिंतित',sm:'feeling anxious about possible problems',ipa:'/ˈwʌrid/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['anxious','concerned','troubled'],ant:['relaxed','carefree'],daily:'I am worried about the exam.',office:'She is worried about the deadline.',interview:'-',business:'-',formal:'He is worried about the financial outlook.',informal:'I\'m so worried right now.',un:'"Worried about" something.',cefr:'A2'},
  {w:'surprised',h:'हैरान',sm:'feeling unexpected amazement',ipa:'/səˈpraɪzd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['astonished','amazed','stunned'],ant:['unsurprised'],daily:'I am surprised by the result.',office:'The boss was surprised by the progress.',interview:'I was pleasantly surprised by the offer.',business:'We were surprised by the market response.',formal:'He was surprised at the announcement.',informal:'I\'m totally surprised!',un:'"Surprised at/by" something.',cefr:'A2'},
  {w:'disappointed',h:'निराश',sm:'feeling sad because expectations were not met',ipa:'/ˌdɪsəˈpɔɪntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['let down','dissatisfied'],ant:['pleased','satisfied'],daily:'I am disappointed with the outcome.',office:'The manager was disappointed with the team.',interview:'-',business:'We are disappointed with the delay.',formal:'He was disappointed by the result.',informal:'I\'m so disappointed, honestly.',un:'"Disappointed with/in" someone or "about" something.',cefr:'B1'},
  {w:'satisfied',h:'संतुष्ट',sm:'pleased because needs or expectations are met',ipa:'/ˈsætɪsfaɪd/',vf:{base:'satisfy',s3:'satisfies',ing:'satisfying',past:'satisfied',pp:'satisfied'},syn:['pleased','content'],ant:['dissatisfied'],daily:'I am satisfied with my progress.',office:'The client is satisfied with the service.',interview:'I am satisfied when I meet my targets.',business:'Customer satisfaction is our priority.',formal:'We are satisfied with the audit outcome.',informal:'I\'m fully satisfied!',un:'"Satisfied with" something.',cefr:'B1'},
  {w:'frustrated',h:'हताश',sm:'feeling annoyed due to inability to achieve something',ipa:'/frʌˈstreɪtɪd/',vf:{base:'frustrate',s3:'frustrates',ing:'frustrating',past:'frustrated',pp:'frustrated'},syn:['exasperated','annoyed'],ant:['satisfied','content'],daily:'I am frustrated with the slow internet.',office:'He is frustrated with repetitive errors.',interview:'-',business:'-',formal:'-',informal:'I\'m so frustrated with this!',un:'"Frustrated with/about" something.',cefr:'B1'},
  {w:'embarrassed',h:'शर्मिंदा',sm:'feeling self-conscious or ashamed',ipa:'/ɪmˈbærəst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['ashamed','self-conscious'],ant:['proud'],daily:'I am embarrassed by my mistake.',office:'She was embarrassed in front of the team.',interview:'-',business:'-',formal:'-',informal:'So embarrassed right now!',un:'"Embarrassed about/by" something.',cefr:'B1'},
  {w:'jealous',h:'ईर्ष्यालु',sm:'feeling envy toward another\'s advantage',ipa:'/ˈdʒɛləs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['envious','covetous'],ant:['content','satisfied'],daily:'I am not jealous of anyone.',office:'-',interview:'-',business:'-',formal:'-',informal:'Are you jealous? Just admit it!',un:'"Jealous of" someone.',cefr:'B1'},
  {w:'eager',h:'उत्सुक',sm:'enthusiastically wanting to do something',ipa:'/ˈiːɡər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['enthusiastic','keen','willing'],ant:['reluctant','unwilling'],daily:'I am eager to learn.',office:'She is eager to take on more responsibility.',interview:'I am eager to contribute to your team.',business:'We are eager to close the deal.',formal:'He is eager to prove himself.',informal:'I\'m so eager to start!',un:'"Eager to" + verb.',cefr:'B1'},
  // Descriptions - physical
  {w:'tall',h:'लंबा',sm:'of greater than average height',ipa:'/tɔːl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['high','lofty'],ant:['short'],daily:'He is very tall.',office:'-',interview:'-',business:'-',formal:'-',informal:'Wow, you\'re so tall!',un:'Antonym: short (for people), low (for objects).',cefr:'A1'},
  {w:'short',h:'छोटा/नाटा',sm:'of less than average height',ipa:'/ʃɔːrt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['small','petite'],ant:['tall'],daily:'She is short but very fast.',office:'-',interview:'-',business:'-',formal:'-',informal:'He\'s quite short but super confident.',un:'For height use "short"; for length also "short".',cefr:'A1'},
  {w:'beautiful',h:'सुंदर',sm:'pleasing to the senses; attractive',ipa:'/ˈbjuːtɪfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['lovely','gorgeous','stunning'],ant:['ugly'],daily:'She is a beautiful person inside and out.',office:'-',interview:'-',business:'-',formal:'The venue was beautifully decorated.',informal:'You\'re so beautiful!',un:'For objects and people.',cefr:'A1'},
  {w:'smart',h:'होशियार',sm:'intelligent; also neat in appearance',ipa:'/smɑːrt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['intelligent','clever','bright'],ant:['dull','slow'],daily:'She is very smart.',office:'He is a smart problem-solver.',interview:'I am smart about managing time.',business:'Smart business decisions matter.',formal:'He is a smart and articulate speaker.',informal:'You\'re so smart, seriously!',un:'British English: "smart" means well-dressed.',cefr:'A2'},
  {w:'intelligent',h:'बुद्धिमान',sm:'having a high level of mental ability',ipa:'/ɪnˈtɛlɪdʒənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['clever','bright','sharp'],ant:['unintelligent','dull'],daily:'He is a very intelligent boy.',office:'She is an intelligent analyst.',interview:'I consider myself intelligent and hardworking.',business:'-',formal:'He is an intelligent and capable officer.',informal:'She\'s super intelligent!',un:'More formal than "smart".',cefr:'A2'},
  {w:'kind',h:'दयालु',sm:'having a gentle, caring nature',ipa:'/kaɪnd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['gentle','caring','warm'],ant:['unkind','cruel'],daily:'She is always kind to everyone.',office:'He is kind with new employees.',interview:'I am kind and empathetic.',business:'-',formal:'She is known for her kind nature.',informal:'Be kind to each other!',un:'"Kind to" people; "a kind of" = type.',cefr:'A1'},
  {w:'brave',h:'बहादुर',sm:'ready to face danger or difficulty without fear',ipa:'/breɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['courageous','fearless','bold'],ant:['cowardly','fearful'],daily:'He is brave in tough situations.',office:'It was brave of her to raise that issue.',interview:'-',business:'-',formal:'He was a brave soldier.',informal:'Be brave, you\'ve got this!',un:'"Brave" as an adjective or verb (to brave a storm).',cefr:'A2'},
  {w:'honest',h:'ईमानदार',sm:'truthful and not deceiving others',ipa:'/ˈɒnɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['truthful','sincere','frank'],ant:['dishonest','deceitful'],daily:'I am always honest.',office:'Be honest in your reports.',interview:'I am honest and transparent.',business:'Honesty builds trust with clients.',formal:'He is known for being honest.',informal:'Just be honest with me.',un:'"Honest with" a person.',cefr:'A2'},
  {w:'lazy',h:'आलसी',sm:'unwilling to work or be active',ipa:'/ˈleɪzi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['idle','sluggish'],ant:['hardworking','diligent'],daily:'Don\'t be lazy, get up!',office:'He is lazy and misses deadlines.',interview:'-',business:'-',formal:'-',informal:'Stop being so lazy!',un:'Negative character trait.',cefr:'A1'},
  {w:'hardworking',h:'परिश्रमी',sm:'tending to work with great effort',ipa:'/ˈhɑːrdwɜːrkɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['diligent','industrious'],ant:['lazy'],daily:'My father is very hardworking.',office:'She is hardworking and reliable.',interview:'I am hardworking and sincere.',business:'Our team is hardworking.',formal:'He is a hardworking and dedicated officer.',informal:'You\'re so hardworking, honestly!',un:'Compound adjective; hyphenated.',cefr:'A2'},
  {w:'punctual',h:'समयनिष्ठ',sm:'doing things at the agreed time',ipa:'/ˈpʌŋktʃuəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['on time','timely'],ant:['late','tardy'],daily:'I am always punctual.',office:'Punctual employees are well respected.',interview:'I am very punctual and disciplined.',business:'Punctuality is important in business.',formal:'He is known for being punctual.',informal:'Be punctual, don\'t keep them waiting.',un:'"Punctual" is used for people; "on time" is more general.',cefr:'B1'},
  {w:'reliable',h:'भरोसेमंद',sm:'consistently trustworthy and dependable',ipa:'/rɪˈlaɪəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['dependable','trustworthy'],ant:['unreliable'],daily:'My car is very reliable.',office:'She is a reliable team member.',interview:'I am a reliable and consistent performer.',business:'Reliable partners are hard to find.',formal:'He is reliable and professionally responsible.',informal:'You\'re so reliable, I can always count on you.',un:'"Reliable" for people and things.',cefr:'B1'},
  {w:'responsible',h:'जिम्मेदार',sm:'having the obligation to manage something well',ipa:'/rɪˈspɒnsɪbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['accountable','dependable'],ant:['irresponsible'],daily:'I am responsible for my own learning.',office:'She is responsible for the accounts.',interview:'I am responsible and result-oriented.',business:'We are responsible to our stakeholders.',formal:'He is responsible for all operations.',informal:'Be responsible, okay?',un:'"Responsible for" something.',cefr:'A2'},
  {w:'creative',h:'रचनात्मक',sm:'using imagination to produce new things',ipa:'/kriˈeɪtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['imaginative','innovative'],ant:['uncreative'],daily:'I am creative in problem-solving.',office:'She is creative in her approach.',interview:'I am creative and solution-focused.',business:'Creative marketing is our strength.',formal:'He is a creative and visionary leader.',informal:'You\'re so creative!',un:'"Creative" as an adjective or noun (a creative).',cefr:'B1'},
  {w:'flexible',h:'लचीला',sm:'able to change easily to new conditions',ipa:'/ˈflɛksɪbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['adaptable','versatile'],ant:['rigid','inflexible'],daily:'I am flexible with my time.',office:'She is flexible with her schedule.',interview:'I am flexible and can work in any shift.',business:'We are flexible in our pricing.',formal:'He is flexible and open to feedback.',informal:'Be flexible, plans change!',un:'"Flexible" about/with something.',cefr:'B1'},
  {w:'adaptable',h:'अनुकूलनशील',sm:'able to adjust to different situations',ipa:'/əˈdæptəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['flexible','versatile'],ant:['rigid'],daily:'I am adaptable to new environments.',office:'She is adaptable to any working style.',interview:'I am adaptable to any work culture.',business:'Our products are adaptable to client needs.',formal:'He is adaptable and a quick learner.',informal:'You\'re so adaptable, I admire that.',un:'Interview strength vocabulary.',cefr:'B2'},
  {w:'professional',h:'पेशेवर',sm:'relating to a job requiring training; skilled and competent',ipa:'/prəˈfɛʃənl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['skilled','expert','competent'],ant:['amateur','unprofessional'],daily:'He is very professional.',office:'Always be professional at work.',interview:'I am professional and well-organized.',business:'We maintain a professional standard.',formal:'She is a professional with 10 years of experience.',informal:'He\'s so professional, even in casual settings.',un:'"Professional" as adjective or noun.',cefr:'B1'},
  {w:'efficient',h:'कुशल',sm:'doing things well without wasting time or energy',ipa:'/ɪˈfɪʃənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['effective','productive'],ant:['inefficient'],daily:'She is very efficient in her work.',office:'Our new system is very efficient.',interview:'I am efficient and detail-oriented.',business:'Efficient processes save money.',formal:'He is an efficient administrator.',informal:'You\'re so efficient!',un:'"Efficient at" doing something.',cefr:'B1'},
  {w:'organized',h:'व्यवस्थित',sm:'arranged neatly and efficiently',ipa:'/ˈɔːrɡənaɪzd/',vf:{base:'organize',s3:'organizes',ing:'organizing',past:'organized',pp:'organized'},syn:['systematic','orderly'],ant:['disorganized','messy'],daily:'I am very organized.',office:'She is organized with her files.',interview:'I am organized and a good planner.',business:'Being organized is key in project management.',formal:'He is organized and systematic.',informal:'I try to stay organized.',un:'"Organized" as adj or past tense of organize.',cefr:'B1'},
  {w:'proactive',h:'पहल करने वाला',sm:'acting in anticipation of future problems',ipa:'/proʊˈæktɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['initiative-taking','forward-thinking'],ant:['reactive','passive'],daily:'-',office:'Be proactive in solving issues.',interview:'I am a proactive person.',business:'A proactive approach prevents problems.',formal:'He takes a proactive stance.',informal:'-',un:'Corporate/professional vocabulary.',cefr:'B2'},
  {w:'innovative',h:'नवप्रवर्तक',sm:'introducing new ideas or methods',ipa:'/ˈɪnəveɪtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['creative','inventive'],ant:['conventional'],daily:'-',office:'She is innovative in her approach.',interview:'I am innovative and love finding new solutions.',business:'We are an innovative company.',formal:'He is an innovative thinker.',informal:'-',un:'"Innovative" in business and interview context.',cefr:'B2'},
  // Occupations
  {w:'doctor',h:'डॉक्टर',sm:'a person trained in medicine who treats patients',ipa:'/ˈdɒktər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['physician','medic'],ant:[],daily:'He is a doctor at City Hospital.',office:'The company doctor is on call.',interview:'-',business:'-',formal:'She is a qualified doctor.',informal:'My uncle is a doctor.',un:'Use "a doctor" — needs article.',cefr:'A1'},
  {w:'teacher',h:'शिक्षक',sm:'a person who teaches in a school or college',ipa:'/ˈtiːtʃər/',vf:{base:'teach',s3:'teaches',ing:'teaching',past:'taught',pp:'taught'},syn:['instructor','educator'],ant:['student'],daily:'She is my favorite teacher.',office:'-',interview:'-',business:'-',formal:'He is a dedicated teacher.',informal:'My teacher is so cool.',un:'"Teacher" for school; "professor" for college.',cefr:'A1'},
  {w:'engineer',h:'इंजीनियर',sm:'a person who designs or builds machines and structures',ipa:'/ˌɛndʒɪˈnɪər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['technician','specialist'],ant:[],daily:'He is an engineer at a tech firm.',office:'She is a senior software engineer.',interview:'I am an engineer with five years of experience.',business:'-',formal:'He is a chartered engineer.',informal:'My friend is an engineer.',un:'"An engineer" — starts with vowel, use "an".',cefr:'A2'},
  {w:'manager',h:'प्रबंधक',sm:'a person responsible for controlling a team or organization',ipa:'/ˈmænɪdʒər/',vf:{base:'manage',s3:'manages',ing:'managing',past:'managed',pp:'managed'},syn:['supervisor','director'],ant:[],daily:'My manager is very supportive.',office:'She is our project manager.',interview:'I want to become a manager.',business:'The account manager is available.',formal:'He is the general manager.',informal:'My manager\'s really cool.',un:'"Manager of" a team/department.',cefr:'A2'},
  {w:'lawyer',h:'वकील',sm:'a person trained in law who advises clients',ipa:'/ˈlɔːjər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['attorney','advocate','counsel'],ant:[],daily:'He is a lawyer by profession.',office:'-',interview:'-',business:'We have a lawyer for legal matters.',formal:'She is a practicing lawyer.',informal:'My dad is a lawyer.',un:'"Lawyer" in US; "solicitor/barrister" in UK.',cefr:'A2'},
  {w:'nurse',h:'नर्स',sm:'a person who cares for sick people in a hospital',ipa:'/nɜːrs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['caregiver','healthcare worker'],ant:[],daily:'She is a nurse at the local clinic.',office:'-',interview:'-',business:'-',formal:'She is a registered nurse.',informal:'My sister is a nurse.',un:'Can be male or female.',cefr:'A1'},
  {w:'pilot',h:'पायलट',sm:'a person who flies an aircraft',ipa:'/ˈpaɪlət/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['aviator','flyer'],ant:[],daily:'She is a commercial pilot.',office:'-',interview:'-',business:'-',formal:'He is a licensed pilot.',informal:'My neighbor is a pilot.',un:'"Pilot" also means to test something.',cefr:'A2'},
  {w:'accountant',h:'लेखाकार',sm:'a person who manages financial records',ipa:'/əˈkaʊntənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['bookkeeper','auditor'],ant:[],daily:'He is an accountant at a firm.',office:'Our accountant handles tax filings.',interview:'I am an accountant with CA qualification.',business:'Hire a good accountant for your business.',formal:'She is a chartered accountant.',informal:'He\'s an accountant, very detail-oriented.',un:'"An accountant" — use "an".',cefr:'B1'},
  {w:'architect',h:'वास्तुकार',sm:'a person who designs buildings',ipa:'/ˈɑːrkɪtɛkt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['designer','planner'],ant:[],daily:'She is an architect.',office:'-',interview:'I am an architect with urban planning experience.',business:'-',formal:'He is a renowned architect.',informal:'She\'s an architect, she designed her own house.',un:'"An architect" — use "an".',cefr:'B1'},
  {w:'journalist',h:'पत्रकार',sm:'a person who writes for newspapers, TV, or online media',ipa:'/ˈdʒɜːrnəlɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['reporter','correspondent'],ant:[],daily:'She is a journalist.',office:'-',interview:'-',business:'-',formal:'He is an award-winning journalist.',informal:'My friend is a journalist.',un:'"Journalist" for print/broadcast media.',cefr:'B1'},
  {w:'scientist',h:'वैज्ञानिक',sm:'a person who studies natural sciences',ipa:'/ˈsaɪəntɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['researcher','scholar'],ant:[],daily:'She is a scientist at a research lab.',office:'-',interview:'-',business:'-',formal:'He is a distinguished scientist.',informal:'My cousin is a scientist.',un:'"A scientist who studies X".',cefr:'A2'},
  {w:'artist',h:'कलाकार',sm:'a person who creates art',ipa:'/ˈɑːrtɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['painter','creator'],ant:[],daily:'She is a talented artist.',office:'-',interview:'-',business:'-',formal:'He is a celebrated artist.',informal:'My sister is an artist.',un:'Painter, sculptor, musician — all are "artists".',cefr:'A2'},
  {w:'chef',h:'रसोइया',sm:'a professional cook in a restaurant or hotel',ipa:'/ʃɛf/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['cook','culinary expert'],ant:[],daily:'He is a chef at a five-star hotel.',office:'-',interview:'-',business:'-',formal:'She is the head chef.',informal:'My friend is a chef, amazing food!',un:'"Chef" for professional; "cook" for home.',cefr:'A2'},
  {w:'consultant',h:'सलाहकार',sm:'a person who gives expert advice professionally',ipa:'/kənˈsʌltənt/',vf:{base:'consult',s3:'consults',ing:'consulting',past:'consulted',pp:'consulted'},syn:['advisor','expert'],ant:[],daily:'-',office:'She is a management consultant.',interview:'I am a consultant specializing in HR.',business:'We hired a consultant for the project.',formal:'He is a senior consultant.',informal:'He\'s a consultant, knows everything.',un:'"Consultant for/to" a company.',cefr:'B2'},
  {w:'analyst',h:'विश्लेषक',sm:'a person who analyzes data or situations',ipa:'/ˈænəlɪst/',vf:{base:'analyze',s3:'analyzes',ing:'analyzing',past:'analyzed',pp:'analyzed'},syn:['researcher','examiner'],ant:[],daily:'-',office:'She is a data analyst.',interview:'I am a business analyst.',business:'Our analyst prepared the report.',formal:'He is a senior financial analyst.',informal:'He\'s an analyst, very data-driven.',un:'"An analyst" — use "an".',cefr:'B2'},
  {w:'developer',h:'डेवलपर',sm:'a person who creates software or builds applications',ipa:'/dɪˈvɛləpər/',vf:{base:'develop',s3:'develops',ing:'developing',past:'developed',pp:'developed'},syn:['programmer','coder'],ant:[],daily:'-',office:'She is a full-stack developer.',interview:'I am a software developer with 3 years experience.',business:'Our developer built the app.',formal:'He is a senior software developer.',informal:'He\'s a developer, very techy.',un:'"Software developer" or "web developer".',cefr:'B1'},
  {w:'designer',h:'डिज़ाइनर',sm:'a person who creates designs for products or graphics',ipa:'/dɪˈzaɪnər/',vf:{base:'design',s3:'designs',ing:'designing',past:'designed',pp:'designed'},syn:['creator','artist'],ant:[],daily:'-',office:'She is a graphic designer.',interview:'I am a UI/UX designer.',business:'Our designer created the logo.',formal:'He is the lead designer.',informal:'She\'s a designer, everything looks perfect.',un:'"Graphic designer", "interior designer" etc.',cefr:'B1'},
  {w:'trainer',h:'प्रशिक्षक',sm:'a person who teaches skills through practice',ipa:'/ˈtreɪnər/',vf:{base:'train',s3:'trains',ing:'training',past:'trained',pp:'trained'},syn:['instructor','coach'],ant:[],daily:'He is a fitness trainer.',office:'She is a corporate trainer.',interview:'-',business:'We hired a trainer for the new staff.',formal:'He is a certified trainer.',informal:'My trainer is really tough!',un:'"Trainer" for sports, fitness, or corporate.',cefr:'B1'},
  {w:'professor',h:'प्रोफेसर',sm:'a senior teacher at a university',ipa:'/prəˈfɛsər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['lecturer','academic'],ant:['student'],daily:'She is a professor at Delhi University.',office:'-',interview:'-',business:'-',formal:'He is a distinguished professor.',informal:'My professor is brilliant.',un:'"Professor" for university; "teacher" for school.',cefr:'A2'},
  {w:'dentist',h:'दंत चिकित्सक',sm:'a doctor who treats teeth',ipa:'/ˈdɛntɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['dental surgeon'],ant:[],daily:'She is a dentist.',office:'-',interview:'-',business:'-',formal:'He is a licensed dentist.',informal:'My dentist is very gentle.',un:'"A dentist" — use "a".',cefr:'A2'},
  {w:'pharmacist',h:'फार्मासिस्ट',sm:'a person who prepares and dispenses medicines',ipa:'/ˈfɑːrməsɪst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['chemist','dispenser'],ant:[],daily:'He is a pharmacist at the local pharmacy.',office:'-',interview:'-',business:'-',formal:'She is a registered pharmacist.',informal:'My neighbor is a pharmacist.',un:'"Pharmacist" in US; "chemist" in UK.',cefr:'B1'},
  // Locations and place words
  {w:'home',h:'घर',sm:'the place where one lives',ipa:'/hoʊm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['house','residence'],ant:['office','work'],daily:'I am at home today.',office:'-',interview:'-',business:'-',formal:'He is working from home.',informal:'I\'m home, finally!',un:'"At home" (location) vs "home" (direction).',cefr:'A1'},
  {w:'office',h:'दफ़्तर',sm:'a room or building where people work',ipa:'/ˈɒfɪs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['workplace','bureau'],ant:['home'],daily:'I am in the office.',office:'The office is on the third floor.',interview:'The office culture was great.',business:'Our office is in Connaught Place.',formal:'He reports to the head office.',informal:'I\'m at the office till 7.',un:'"In the office" (inside); "at the office" (general location).',cefr:'A1'},
  {w:'school',h:'स्कूल',sm:'an institution for educating children',ipa:'/skuːl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['institution','academy'],ant:[],daily:'My children are at school.',office:'-',interview:'-',business:'-',formal:'He was the top student at school.',informal:'School was fun today!',un:'"At school" means they are there studying.',cefr:'A1'},
  {w:'hospital',h:'अस्पताल',sm:'a place where sick people are treated',ipa:'/ˈhɒspɪtl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['clinic','medical center'],ant:[],daily:'My uncle is in the hospital.',office:'-',interview:'-',business:'-',formal:'She is at the hospital for surgery.',informal:'He\'s in hospital recovering.',un:'"In hospital" (British); "in the hospital" (American).',cefr:'A1'},
  {w:'market',h:'बाज़ार',sm:'a place where goods are bought and sold',ipa:'/ˈmɑːrkɪt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['bazaar','store'],ant:[],daily:'She is at the market.',office:'-',interview:'-',business:'The market is very competitive.',formal:'He analyzed the market carefully.',informal:'I\'m at the market, need anything?',un:'"At the market" for location.',cefr:'A1'},
  {w:'meeting',h:'बैठक',sm:'a gathering of people to discuss something',ipa:'/ˈmiːtɪŋ/',vf:{base:'meet',s3:'meets',ing:'meeting',past:'met',pp:'met'},syn:['conference','session'],ant:[],daily:'I am in a meeting.',office:'The meeting is at 2 PM.',interview:'-',business:'The board meeting was productive.',formal:'He chaired the annual general meeting.',informal:'I\'m stuck in a meeting!',un:'"In a meeting" or "at a meeting".',cefr:'A2'},
  {w:'classroom',h:'कक्षा',sm:'a room in a school where teaching happens',ipa:'/ˈklɑːsruːm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['class','lecture hall'],ant:[],daily:'Students are in the classroom.',office:'-',interview:'-',business:'-',formal:'The classroom was well-equipped.',informal:'Classroom is so boring today.',un:'"In the classroom" for location.',cefr:'A1'},
  {w:'station',h:'स्टेशन',sm:'a place where trains, buses stop',ipa:'/ˈsteɪʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['depot','terminal'],ant:[],daily:'I am at the station.',office:'-',interview:'-',business:'-',formal:'He was at the railway station.',informal:'I\'m at the station, almost there.',un:'"At the station".',cefr:'A1'},
  {w:'airport',h:'हवाई अड्डा',sm:'a place where airplanes take off and land',ipa:'/ˈɛərpɔːrt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['aerodrome','airfield'],ant:[],daily:'He is at the airport.',office:'-',interview:'-',business:'I am at the airport for a business trip.',formal:'She was at the international airport.',informal:'Stuck at the airport, flight delayed!',un:'"At the airport".',cefr:'A1'},
  {w:'temple',h:'मंदिर',sm:'a place of worship',ipa:'/ˈtɛmpl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['shrine'],ant:[],daily:'She is at the temple.',office:'-',interview:'-',business:'-',formal:'He was at the temple for prayers.',informal:'Going to the temple this evening.',un:'"At the temple".',cefr:'A1'},
  {w:'abroad',h:'विदेश में',sm:'in or to a foreign country',ipa:'/əˈbrɔːd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['overseas','foreign'],ant:['at home','domestically'],daily:'She is studying abroad.',office:'-',interview:'-',business:'He is currently abroad on a business trip.',formal:'She is residing abroad.',informal:'He\'s abroad right now.',un:'"Abroad" = in another country; no article.',cefr:'B1'},
  // Time words
  {w:'yesterday',h:'कल (बीता हुआ)',sm:'the day before today',ipa:'/ˈjɛstədeɪ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['last day'],ant:['tomorrow'],daily:'I was sick yesterday.',office:'The report was submitted yesterday.',interview:'-',business:'The client called yesterday.',formal:'He was absent yesterday.',informal:'I was so tired yesterday!',un:'Used with past tense.',cefr:'A1'},
  {w:'today',h:'आज',sm:'this present day',ipa:'/təˈdeɪ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['this day','now'],ant:['yesterday','tomorrow'],daily:'I am busy today.',office:'The meeting is today.',interview:'I am here for an interview today.',business:'Deliveries are scheduled today.',formal:'Today\'s session will begin now.',informal:'What are we doing today?',un:'Present tense context.',cefr:'A1'},
  {w:'tomorrow',h:'कल (आने वाला)',sm:'the day after today',ipa:'/təˈmɒroʊ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['the next day'],ant:['yesterday'],daily:'I will be ready tomorrow.',office:'The meeting is tomorrow.',interview:'My interview is tomorrow.',business:'The deadline is tomorrow.',formal:'Tomorrow\'s agenda is set.',informal:'See you tomorrow!',un:'Future context.',cefr:'A1'},
  {w:'currently',h:'अभी/वर्तमान में',sm:'at this present time',ipa:'/ˈkʌrəntli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['presently','now','at present'],ant:['formerly','previously'],daily:'I am currently learning English.',office:'She is currently on leave.',interview:'I am currently working at ABC Ltd.',business:'We are currently expanding.',formal:'He is currently the acting director.',informal:'I\'m currently just chilling.',un:'Adverb; flexible position in sentence.',cefr:'B1'},
  {w:'formerly',h:'पहले',sm:'in an earlier time; previously',ipa:'/ˈfɔːrməli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['previously','once'],ant:['currently'],daily:'-',office:'She was formerly the head of HR.',interview:'-',business:'-',formal:'He was formerly employed at XYZ.',informal:'-',un:'"Formerly known as".',cefr:'B2'},
  {w:'recently',h:'हाल ही में',sm:'not long ago',ipa:'/ˈriːsntli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['lately','just'],ant:['long ago'],daily:'I recently moved to Delhi.',office:'She was recently promoted.',interview:'I recently completed my MBA.',business:'We recently launched a new product.',formal:'He was recently honored.',informal:'I recently got a haircut.',un:'Used with recent past.',cefr:'A2'},
  {w:'previously',h:'पहले',sm:'at an earlier time',ipa:'/ˈpriːviəsli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['formerly','before'],ant:['currently'],daily:'-',office:'She was previously the team lead.',interview:'I was previously at XYZ Corp.',business:'-',formal:'He was previously the chairman.',informal:'-',un:'"Previously" for professional background.',cefr:'B1'},
  {w:'eventually',h:'अंततः',sm:'in the end, especially after a long time',ipa:'/ɪˈvɛntʃuəli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['finally','ultimately'],ant:['immediately'],daily:'I will eventually become fluent.',office:'The project will eventually be done.',interview:'-',business:'-',formal:'He eventually became CEO.',informal:'It\'ll happen eventually.',un:'"Eventually" signals long-term expectation.',cefr:'B1'},
  // Grammar and language terms
  {w:'subject',h:'कर्ता',sm:'the person or thing doing the action in a sentence',ipa:'/ˈsʌbdʒɪkt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['agent'],ant:['object'],daily:'I is the subject in "I am happy."',office:'-',interview:'-',business:'-',formal:'Identify the subject in the sentence.',informal:'-',un:'"Subject" in grammar; "subject" also means topic.',cefr:'A2'},
  {w:'predicate',h:'विधेय',sm:'the part of a sentence containing the verb',ipa:'/ˈprɛdɪkɪt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:[],ant:[],daily:'"am happy" is the predicate in "I am happy."',office:'-',interview:'-',business:'-',formal:'The predicate must agree with the subject.',informal:'-',un:'Grammatical term.',cefr:'B2'},
  {w:'tense',h:'काल',sm:'the form of a verb that indicates time',ipa:'/tɛns/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['time form'],ant:[],daily:'We use past tense for completed actions.',office:'-',interview:'-',business:'-',formal:'The tense of the sentence is present.',informal:'-',un:'Present, past, future are the main tenses.',cefr:'A2'},
  {w:'contraction',h:'संक्षिप्त रूप',sm:'two words joined with an apostrophe',ipa:'/kənˈtrækʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['short form'],ant:['full form'],daily:'"I\'m" is a contraction of "I am".',office:'-',interview:'-',business:'-',formal:'Avoid contractions in formal writing.',informal:'Contractions are common in speech.',un:'"It\'s" and "its" are different!',cefr:'A2'},
  {w:'affirmative',h:'सकारात्मक',sm:'confirming or agreeing; a positive statement',ipa:'/əˈfɜːrmətɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['positive','confirming'],ant:['negative'],daily:'"I am happy" is affirmative.',office:'-',interview:'-',business:'-',formal:'Please give an affirmative response.',informal:'-',un:'Opposite of negative sentences.',cefr:'B1'},
  {w:'negative',h:'नकारात्मक',sm:'expressing denial or disagreement',ipa:'/ˈnɛɡətɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['denying','contradicting'],ant:['affirmative','positive'],daily:'"I am not happy" is negative.',office:'-',interview:'-',business:'-',formal:'The feedback was negative.',informal:'-',un:'Add "not" after be verb for negation.',cefr:'A2'},
  {w:'interrogative',h:'प्रश्नवाचक',sm:'forming or used in a question',ipa:'/ɪnˈtɛrəɡətɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['questioning'],ant:['declarative'],daily:'"Are you ready?" is interrogative.',office:'-',interview:'-',business:'-',formal:'Use interrogative form for questions.',informal:'-',un:'Invert subject and verb to make questions.',cefr:'B1'},
  {w:'singular',h:'एकवचन',sm:'referring to one person or thing',ipa:'/ˈsɪŋɡjʊlər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['one','single'],ant:['plural'],daily:'He/She/It is singular.',office:'-',interview:'-',business:'-',formal:'Use "is" for singular subjects.',informal:'-',un:'"Is" and "was" for singular.',cefr:'A2'},
  {w:'plural',h:'बहुवचन',sm:'referring to more than one person or thing',ipa:'/ˈplʊərəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['multiple','many'],ant:['singular'],daily:'We/They/You are plural.',office:'-',interview:'-',business:'-',formal:'Use "are" for plural subjects.',informal:'-',un:'"Are" and "were" for plural.',cefr:'A2'},
  {w:'agreement',h:'अनुरूपता (व्याकरण में)',sm:'matching the form of a verb with its subject',ipa:'/əˈɡriːmənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['concord'],ant:['disagreement'],daily:'Subject-verb agreement is important.',office:'-',interview:'-',business:'-',formal:'Ensure subject-verb agreement in all sentences.',informal:'-',un:'"Agreement" in grammar = subject-verb match.',cefr:'B2'},
  // More adjectives - descriptions
  {w:'large',h:'बड़ा',sm:'of great size or extent',ipa:'/lɑːrdʒ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['big','huge','enormous'],ant:['small','tiny'],daily:'The room is very large.',office:'The conference hall is large.',interview:'-',business:'We are a large organization.',formal:'The campus is large and well-maintained.',informal:'This bag is too large!',un:'"Large" for size; also "large" in business (large company).',cefr:'A1'},
  {w:'tiny',h:'बहुत छोटा',sm:'extremely small',ipa:'/ˈtaɪni/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['minute','miniature'],ant:['huge','large'],daily:'This apartment is tiny.',office:'-',interview:'-',business:'-',formal:'-',informal:'The place is tiny but cozy.',un:'"Tiny" is more informal than "small".',cefr:'A2'},
  {w:'excellent',h:'उत्कृष्ट',sm:'extremely good; outstanding',ipa:'/ˈɛksələnt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['outstanding','superb','exceptional'],ant:['terrible','poor'],daily:'The food is excellent.',office:'Her work is excellent.',interview:'My communication skills are excellent.',business:'We provide excellent service.',formal:'His performance is excellent.',informal:'That was excellent!',un:'"Excellent at" something.',cefr:'A2'},
  {w:'terrible',h:'भयानक/बुरा',sm:'extremely bad',ipa:'/ˈtɛrɪbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['awful','dreadful','horrible'],ant:['excellent','wonderful'],daily:'The weather is terrible today.',office:'The presentation was terrible.',interview:'-',business:'-',formal:'-',informal:'That film was terrible!',un:'Stronger negative than "bad".',cefr:'A2'},
  {w:'wonderful',h:'अद्भुत',sm:'inspiring great happiness or admiration',ipa:'/ˈwʌndərfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['amazing','fantastic','marvelous'],ant:['terrible'],daily:'What a wonderful day!',office:'It was a wonderful team effort.',interview:'This is a wonderful opportunity.',business:'The results are wonderful.',formal:'The project was a wonderful success.',informal:'She\'s wonderful!',un:'"Wonderful" = informal but heartfelt praise.',cefr:'A2'},
  {w:'unique',h:'अनोखा',sm:'unlike anything else; one of a kind',ipa:'/juˈniːk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['one-of-a-kind','singular'],ant:['common','ordinary'],daily:'His idea is unique.',office:'Our product is unique.',interview:'My experience is unique.',business:'We offer a unique solution.',formal:'He has a unique approach.',informal:'She\'s so unique!',un:'"Very unique" is grammatically debated.',cefr:'B1'},
  {w:'valuable',h:'मूल्यवान',sm:'worth a lot of money or very useful',ipa:'/ˈvæljuəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['precious','priceless'],ant:['worthless'],daily:'Time is very valuable.',office:'Your feedback is valuable.',interview:'My experience is valuable for this role.',business:'This data is valuable for analysis.',formal:'His contribution was valuable.',informal:'That\'s really valuable advice.',un:'"Valuable to/for" someone.',cefr:'B1'},
  {w:'available',h:'उपलब्ध',sm:'able to be used or obtained',ipa:'/əˈveɪləbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['accessible','obtainable'],ant:['unavailable'],daily:'Are you available tonight?',office:'I am available on Thursday.',interview:'I am available to join immediately.',business:'The product is available online.',formal:'He is available for consultation.',informal:'Are you available? Let\'s hang out.',un:'"Available for/on" something.',cefr:'A2'},
  {w:'suitable',h:'उपयुक्त',sm:'right or appropriate for something',ipa:'/ˈsuːtəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['appropriate','fitting'],ant:['unsuitable'],daily:'This dress is suitable for the occasion.',office:'She is suitable for the role.',interview:'I am a suitable candidate for this position.',business:'Is this solution suitable for your needs?',formal:'He is suitable for the post.',informal:'Is this venue suitable?',un:'"Suitable for" something.',cefr:'B1'},
  {w:'qualified',h:'योग्य',sm:'having the right knowledge or skills for something',ipa:'/ˈkwɒlɪfaɪd/',vf:{base:'qualify',s3:'qualifies',ing:'qualifying',past:'qualified',pp:'qualified'},syn:['competent','eligible'],ant:['unqualified'],daily:'She is qualified for the job.',office:'Only qualified candidates will be shortlisted.',interview:'I am well qualified for this role.',business:'-',formal:'He is a qualified engineer.',informal:'She\'s very qualified.',un:'"Qualified in/for" something.',cefr:'B1'},
  {w:'experienced',h:'अनुभवी',sm:'having knowledge from doing something for a long time',ipa:'/ɪkˈspɪəriənst/',vf:{base:'experience',s3:'experiences',ing:'experiencing',past:'experienced',pp:'experienced'},syn:['seasoned','skilled'],ant:['inexperienced'],daily:'-',office:'We need experienced candidates.',interview:'I am an experienced professional.',business:'He is experienced in international trade.',formal:'She is a highly experienced doctor.',informal:'He\'s super experienced.',un:'"Experienced in/at" something.',cefr:'B1'},
  {w:'ambitious',h:'महत्वाकांक्षी',sm:'having a strong desire to succeed',ipa:'/æmˈbɪʃəs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['driven','aspiring'],ant:['unambitious','content'],daily:'I am very ambitious.',office:'She is ambitious and hardworking.',interview:'I am ambitious and always strive for growth.',business:'Our company is ambitious.',formal:'He is an ambitious professional.',informal:'You\'re so ambitious, I love it.',un:'"Ambitious about" something.',cefr:'B1'},
  {w:'polite',h:'विनम्र',sm:'having good manners; respectful',ipa:'/pəˈlaɪt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['courteous','respectful','civil'],ant:['rude','impolite'],daily:'Be polite to elders.',office:'She is always polite with clients.',interview:'I am polite and easy to work with.',business:'Politeness builds good client relationships.',formal:'He is polite and well-mannered.',informal:'Be polite, come on!',un:'Antonym: rude.',cefr:'A2'},
  {w:'rude',h:'अशिष्ट',sm:'not having good manners; disrespectful',ipa:'/ruːd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['impolite','disrespectful','offensive'],ant:['polite','courteous'],daily:'Don\'t be rude.',office:'He was rude to the customer.',interview:'-',business:'-',formal:'-',informal:'That was so rude!',un:'Negative character trait.',cefr:'A2'},
  {w:'shy',h:'शर्मीला',sm:'nervous about talking to people',ipa:'/ʃaɪ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['timid','bashful'],ant:['outgoing','bold'],daily:'He is a bit shy.',office:'-',interview:'I used to be shy but I am now confident.',business:'-',formal:'-',informal:'She\'s so shy, it\'s cute.',un:'"Shy" about something.',cefr:'A2'},
  {w:'outgoing',h:'मिलनसार',sm:'friendly and social; enjoys meeting people',ipa:'/ˈaʊtɡoʊɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['sociable','friendly','extroverted'],ant:['shy','reserved','introverted'],daily:'I am an outgoing person.',office:'-',interview:'I have an outgoing personality.',business:'-',formal:'She is outgoing and approachable.',informal:'He\'s so outgoing, everyone loves him.',un:'"Outgoing personality" = common interview phrase.',cefr:'B1'},
  {w:'sincere',h:'निष्ठावान',sm:'genuine and honest in feelings or behavior',ipa:'/sɪnˈsɪər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['genuine','honest'],ant:['insincere','dishonest'],daily:'I am sincere in my efforts.',office:'-',interview:'I am sincere and dedicated.',business:'-',formal:'He gave a sincere apology.',informal:'You\'re genuinely sincere.',un:'"Sincere in" efforts/work.',cefr:'B1'},
  {w:'diligent',h:'परिश्रमी',sm:'showing careful and persistent effort',ipa:'/ˈdɪlɪdʒənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['hardworking','industrious','thorough'],ant:['lazy','careless'],daily:'She is a diligent student.',office:'He is a diligent and thorough worker.',interview:'I am a diligent and detail-oriented person.',business:'Diligent employees are an asset.',formal:'He is known for being diligent.',informal:'She\'s so diligent, respect.',un:'"Diligent in" work.',cefr:'B2'},
  {w:'enthusiastic',h:'उत्साही',sm:'having or showing great eagerness',ipa:'/ɪnˌθjuːziˈæstɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['eager','passionate','keen'],ant:['indifferent','unenthusiastic'],daily:'I am enthusiastic about learning.',office:'She is enthusiastic about the new project.',interview:'I am enthusiastic and a fast learner.',business:'We are enthusiastic about the partnership.',formal:'He is enthusiastic about reform.',informal:'She\'s so enthusiastic!',un:'"Enthusiastic about" something.',cefr:'B1'},
  {w:'determined',h:'दृढ़-निश्चयी',sm:'having a firm decision to do something',ipa:'/dɪˈtɜːrmɪnd/',vf:{base:'determine',s3:'determines',ing:'determining',past:'determined',pp:'determined'},syn:['resolved','committed','steadfast'],ant:['hesitant','undecided'],daily:'I am determined to succeed.',office:'She is determined to meet the deadline.',interview:'I am determined to grow in this field.',business:'We are determined to lead the market.',formal:'He is determined to achieve excellence.',informal:'She\'s so determined, nothing stops her.',un:'"Determined to" + verb.',cefr:'B1'},
  {w:'courageous',h:'साहसी',sm:'brave; showing courage',ipa:'/kəˈreɪdʒəs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['brave','bold','fearless'],ant:['cowardly','timid'],daily:'He is very courageous.',office:'-',interview:'-',business:'-',formal:'She was a courageous leader.',informal:'That was courageous of you!',un:'"Courageous" is more formal than "brave".',cefr:'B2'},
  // Common words used in be-verb sentences
  {w:'name',h:'नाम',sm:'a word by which a person or thing is known',ipa:'/neɪm/',vf:{base:'name',s3:'names',ing:'naming',past:'named',pp:'named'},syn:['title','designation'],ant:[],daily:'My name is Priya.',office:'What is your name?',interview:'My name is Rahul Sharma.',business:'The company\'s name is well-known.',formal:'May I know your name?',informal:'Hey, what\'s your name?',un:'"My name is" — no article needed.',cefr:'A1'},
  {w:'age',h:'उम्र',sm:'how old someone or something is',ipa:'/eɪdʒ/',vf:{base:'age',s3:'ages',ing:'aging',past:'aged',pp:'aged'},syn:['years','era'],ant:[],daily:'My age is 22.',office:'-',interview:'I am 28 years of age.',business:'-',formal:'Age and experience complement each other.',informal:'How old are you?',un:'"I am 25 years old" — not "I have 25 years".',cefr:'A1'},
  {w:'nationality',h:'राष्ट्रीयता',sm:'the status of belonging to a particular nation',ipa:'/ˌnæʃəˈnælɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['citizenship'],ant:[],daily:'My nationality is Indian.',office:'-',interview:'I am Indian by nationality.',business:'-',formal:'State your nationality.',informal:'-',un:'"I am Indian" — no article before nationality adj.',cefr:'A2'},
  {w:'origin',h:'मूल',sm:'the point or place where something comes from',ipa:'/ˈɒrɪdʒɪn/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['source','root','beginning'],ant:['destination'],daily:'I am of Indian origin.',office:'-',interview:'My family origin is from Rajasthan.',business:'-',formal:'He is of humble origin.',informal:'-',un:'"Of Indian origin" = from India.',cefr:'B1'},
  {w:'family',h:'परिवार',sm:'a group of people related by blood or marriage',ipa:'/ˈfæməli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['household','kin'],ant:[],daily:'My family is very supportive.',office:'-',interview:'I am from a middle-class family.',business:'-',formal:'Family values are important.',informal:'My family is the best!',un:'"My family" — usually singular verb in British English.',cefr:'A1'},
  {w:'friend',h:'दोस्त',sm:'a person you know well and like',ipa:'/frɛnd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['companion','pal','buddy'],ant:['enemy','foe'],daily:'She is my best friend.',office:'He is a work friend.',interview:'-',business:'-',formal:'He is a close associate and friend.',informal:'She\'s my best friend ever!',un:'"A friend" or "my friend".',cefr:'A1'},
  {w:'colleague',h:'सहकर्मी',sm:'a person you work with',ipa:'/ˈkɒliːɡ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['coworker','associate'],ant:[],daily:'-',office:'He is my colleague.',interview:'I work well with my colleagues.',business:'She is a trusted colleague.',formal:'My colleague will present next.',informal:'He\'s my work buddy, basically a colleague.',un:'"Colleague" is professional; "coworker" more informal.',cefr:'B1'},
  {w:'boss',h:'बॉस',sm:'a person in charge of a workplace',ipa:'/bɒs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['manager','supervisor','chief'],ant:['employee','subordinate'],daily:'He is my boss.',office:'My boss is very understanding.',interview:'-',business:'The boss approved the plan.',formal:'He is the director and my boss.',informal:'My boss is so cool!',un:'"Boss" is informal; use "manager" or "supervisor" in formal context.',cefr:'A1'},
  {w:'team',h:'टीम',sm:'a group of people working together',ipa:'/tiːm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['group','squad'],ant:['individual'],daily:'-',office:'Our team is hardworking.',interview:'I am a good team player.',business:'The sales team is excellent.',formal:'The team is fully committed.',informal:'We\'re a great team!',un:'"Team" takes singular verb in British English.',cefr:'A1'},
  {w:'leader',h:'नेता',sm:'a person who guides or directs others',ipa:'/ˈliːdər/',vf:{base:'lead',s3:'leads',ing:'leading',past:'led',pp:'led'},syn:['head','chief','director'],ant:['follower'],daily:'-',office:'She is our team leader.',interview:'I am a natural leader.',business:'He is the market leader.',formal:'She is a respected leader.',informal:'She\'s a born leader.',un:'"Leader of" a team/country.',cefr:'A2'},
  {w:'expert',h:'विशेषज्ञ',sm:'a person with special skill or knowledge',ipa:'/ˈɛkspɜːrt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['specialist','authority'],ant:['novice','amateur'],daily:'-',office:'She is an expert in finance.',interview:'I am an expert in digital marketing.',business:'We consulted an expert.',formal:'He is a recognized expert in his field.',informal:'She\'s a total expert.',un:'"Expert in/at" something.',cefr:'B1'},
  {w:'beginner',h:'शुरुआती',sm:'a person who is just starting to learn something',ipa:'/bɪˈɡɪnər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['novice','newcomer'],ant:['expert','advanced'],daily:'I am still a beginner in English.',office:'-',interview:'-',business:'-',formal:'-',informal:'I\'m just a beginner, be patient.',un:'"Beginner" level = A1/A2.',cefr:'A1'},
  {w:'citizen',h:'नागरिक',sm:'a person belonging to a country',ipa:'/ˈsɪtɪzən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['national','resident'],ant:['foreigner'],daily:'I am an Indian citizen.',office:'-',interview:'-',business:'-',formal:'He is a responsible citizen.',informal:'-',un:'"Citizen of" a country.',cefr:'B1'},
  {w:'resident',h:'निवासी',sm:'a person who lives in a particular place',ipa:'/ˈrɛzɪdənt/',vf:{base:'reside',s3:'resides',ing:'residing',past:'resided',pp:'resided'},syn:['inhabitant','occupant'],ant:['visitor','tourist'],daily:'I am a resident of Delhi.',office:'-',interview:'-',business:'-',formal:'He is a permanent resident.',informal:'I\'m a resident here for 10 years.',un:'"Resident of" a city/country.',cefr:'B1'},
  {w:'candidate',h:'उम्मीदवार',sm:'a person applying for a job or election',ipa:'/ˈkændɪdeɪt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['applicant','contender'],ant:[],daily:'-',office:'-',interview:'I am a candidate for this position.',business:'-',formal:'He is the strongest candidate.',informal:'-',un:'"Candidate for" a position.',cefr:'B1'},
  {w:'employee',h:'कर्मचारी',sm:'a person who works for another person or company',ipa:'/ɪmˈplɔɪiː/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['worker','staff'],ant:['employer','manager'],daily:'-',office:'She is a valued employee.',interview:'I am an employee at XYZ Corp.',business:'Every employee matters.',formal:'He is a full-time employee.',informal:'I\'m an employee here.',un:'"Employee of/at" a company.',cefr:'B1'},
  {w:'employer',h:'नियोक्ता',sm:'a person or company that employs people',ipa:'/ɪmˈplɔɪər/',vf:{base:'employ',s3:'employs',ing:'employing',past:'employed',pp:'employed'},syn:['company','boss'],ant:['employee'],daily:'-',office:'She is my employer.',interview:'My employer is a large MNC.',business:'The employer offered a good package.',formal:'The employer is responsible for safety.',informal:'-',un:'"Employer vs employee" distinction.',cefr:'B1'},
  {w:'intern',h:'प्रशिक्षु',sm:'a student or trainee working temporarily to gain experience',ipa:'/ˈɪntɜːrn/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['trainee','apprentice'],ant:[],daily:'-',office:'He is an intern in our team.',interview:'I was an intern at Google.',business:'-',formal:'-',informal:'He\'s just an intern but super smart.',un:'"Intern at" a company.',cefr:'B1'},
  {w:'graduate',h:'स्नातक',sm:'a person who has completed a degree',ipa:'/ˈɡrædʒuɪt/',vf:{base:'graduate',s3:'graduates',ing:'graduating',past:'graduated',pp:'graduated'},syn:['alumnus','degree holder'],ant:['undergraduate'],daily:'She is a recent graduate.',office:'-',interview:'I am a fresh graduate from Delhi University.',business:'-',formal:'He is a graduate of IIT Delhi.',informal:'She\'s a new grad!',un:'"Graduate of" a university.',cefr:'B1'},
  // Intensifiers / degree words
  {w:'very',h:'बहुत',sm:'to a high degree; extremely',ipa:'/ˈvɛri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['extremely','highly','greatly'],ant:['slightly','somewhat'],daily:'She is very kind.',office:'This is very important.',interview:'I am very interested in this role.',business:'We are very committed.',formal:'He is very well qualified.',informal:'I\'m very tired.',un:'"Very" + adjective.',cefr:'A1'},
  {w:'quite',h:'काफ़ी',sm:'to a considerable extent; moderately',ipa:'/kwaɪt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fairly','rather','pretty'],ant:['slightly'],daily:'He is quite tall.',office:'The project is quite complex.',interview:'I am quite experienced.',business:'The market is quite competitive.',formal:'He is quite capable.',informal:'She\'s quite nice actually.',un:'British: "quite good" = moderately; American: "quite" = very.',cefr:'B1'},
  {w:'extremely',h:'अत्यधिक',sm:'to a very great degree',ipa:'/ɪkˈstriːmli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['very','immensely','hugely'],ant:['slightly','mildly'],daily:'She is extremely talented.',office:'This issue is extremely urgent.',interview:'I am extremely passionate.',business:'We are extremely competitive.',formal:'He was extremely dedicated.',informal:'That was extremely delicious!',un:'"Extremely" is stronger than "very".',cefr:'B1'},
  {w:'absolutely',h:'बिल्कुल',sm:'completely; without any doubt',ipa:'/ˈæbsəluːtli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['completely','totally','entirely'],ant:['partially'],daily:'That is absolutely correct.',office:'I absolutely agree.',interview:'I am absolutely ready.',business:'We are absolutely committed.',formal:'He was absolutely right.',informal:'That\'s absolutely amazing!',un:'"Absolutely" used for emphasis.',cefr:'B1'},
  {w:'completely',h:'पूरी तरह',sm:'totally; in every way',ipa:'/kəmˈpliːtli/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fully','entirely','totally'],ant:['partially','partly'],daily:'I am completely ready.',office:'The task is completely done.',interview:'I am completely aligned with this role.',business:'The project is completely finished.',formal:'He is completely aware of the situation.',informal:'I\'m completely exhausted.',un:'"Completely" intensifies adjectives and verbs.',cefr:'B1'},
  // Additional useful words
  {w:'present',h:'उपस्थित',sm:'in a particular place; not absent',ipa:'/ˈprɛzənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['here','in attendance'],ant:['absent'],daily:'All students are present.',office:'Please mark me as present.',interview:'I am present for the interview.',business:'-',formal:'All members are present and accounted for.',informal:'I\'m present, don\'t worry.',un:'"Present" as adjective means here; as noun means gift or now.',cefr:'A2'},
  {w:'absent',h:'अनुपस्थित',sm:'not present in a place',ipa:'/ˈæbsənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['away','missing'],ant:['present'],daily:'He is absent today.',office:'She is absent on leave.',interview:'-',business:'-',formal:'He was absent without leave.',informal:'You\'re absent again?',un:'"Absent from" a place.',cefr:'A2'},
  {w:'correct',h:'सही',sm:'free from error; right',ipa:'/kəˈrɛkt/',vf:{base:'correct',s3:'corrects',ing:'correcting',past:'corrected',pp:'corrected'},syn:['right','accurate','proper'],ant:['incorrect','wrong'],daily:'Your answer is correct.',office:'Please correct this mistake.',interview:'I want to give the correct answer.',business:'The data is correct.',formal:'The information is correct.',informal:'Yes, that\'s correct!',un:'Both adjective and verb.',cefr:'A1'},
  {w:'incorrect',h:'गलत',sm:'not right; containing an error',ipa:'/ˌɪnkəˈrɛkt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['wrong','inaccurate'],ant:['correct','right'],daily:'That answer is incorrect.',office:'This report has incorrect data.',interview:'-',business:'-',formal:'The statement was incorrect.',informal:'No, that\'s incorrect.',un:'Prefix "in-" makes it negative.',cefr:'A2'},
  {w:'important',h:'महत्त्वपूर्ण',sm:'having great significance or value',ipa:'/ɪmˈpɔːrtənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['significant','crucial','essential'],ant:['unimportant','trivial'],daily:'Health is important.',office:'This meeting is very important.',interview:'Teamwork is important to me.',business:'Good communication is important.',formal:'This is an important announcement.',informal:'This is super important!',un:'"Important to/for" someone.',cefr:'A2'},
  {w:'necessary',h:'ज़रूरी',sm:'needed or required',ipa:'/ˈnɛsɪsəri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['essential','required','needed'],ant:['unnecessary','optional'],daily:'Exercise is necessary.',office:'It is necessary to meet the deadline.',interview:'-',business:'Compliance is necessary.',formal:'It is necessary to follow the rules.',informal:'Is that really necessary?',un:'"Necessary to" + verb.',cefr:'B1'},
  {w:'possible',h:'संभव',sm:'able to happen or be done',ipa:'/ˈpɒsɪbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['feasible','achievable'],ant:['impossible'],daily:'Anything is possible.',office:'Is it possible to meet on Friday?',interview:'I am willing to work as late as possible.',business:'Is it possible to extend the deadline?',formal:'It is possible to resolve this issue.',informal:'Is that even possible?',un:'"It is possible to" + verb.',cefr:'A2'},
  {w:'impossible',h:'असंभव',sm:'not able to happen or be done',ipa:'/ɪmˈpɒsɪbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['not possible','unachievable'],ant:['possible'],daily:'Nothing is impossible.',office:'That deadline is impossible.',interview:'-',business:'-',formal:'The task was deemed impossible.',informal:'That\'s impossible!',un:'"Impossible" is an absolute — avoid "very impossible".',cefr:'A2'},
  {w:'free',h:'खाली/मुक्त',sm:'available; not busy; or at no cost',ipa:'/friː/',vf:{base:'free',s3:'frees',ing:'freeing',past:'freed',pp:'freed'},syn:['available','open','complimentary'],ant:['busy','occupied'],daily:'Are you free this evening?',office:'I am free after 4 PM.',interview:'I am free to join immediately.',business:'The service is not free.',formal:'He is free to express his opinion.',informal:'I\'m finally free, no more work!',un:'"Free" = available (time) or no cost.',cefr:'A1'},
  {w:'open',h:'खुला',sm:'not closed; available',ipa:'/ˈoʊpən/',vf:{base:'open',s3:'opens',ing:'opening',past:'opened',pp:'opened'},syn:['unlocked','accessible'],ant:['closed','shut'],daily:'The park is open today.',office:'The office is open from 9 to 6.',interview:'-',business:'Our store is open on Sundays.',formal:'The position is open for applications.',informal:'Is the shop open?',un:'Adjective and verb.',cefr:'A1'},
  {w:'closed',h:'बंद',sm:'not open; shut',ipa:'/kloʊzd/',vf:{base:'close',s3:'closes',ing:'closing',past:'closed',pp:'closed'},syn:['shut','locked'],ant:['open'],daily:'The bank is closed today.',office:'The office is closed on Sunday.',interview:'-',business:'The deal is closed.',formal:'The case is now closed.',informal:'The shop is closed, try tomorrow.',un:'Past tense = "closed"; adjective = "closed".',cefr:'A1'},
  {w:'empty',h:'खाली',sm:'having nothing inside',ipa:'/ˈɛmpti/',vf:{base:'empty',s3:'empties',ing:'emptying',past:'emptied',pp:'emptied'},syn:['vacant','bare','hollow'],ant:['full'],daily:'The bottle is empty.',office:'The meeting room is empty.',interview:'-',business:'-',formal:'The warehouse is empty.',informal:'My stomach is empty!',un:'"Empty" = hollow/nothing; "vacant" = not occupied.',cefr:'A1'},
  {w:'full',h:'भरा हुआ',sm:'containing as much as possible',ipa:'/fʊl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['filled','packed'],ant:['empty'],daily:'The bus is full.',office:'My schedule is full.',interview:'-',business:'The hotel is full.',formal:'The auditorium was full.',informal:'I\'m full, can\'t eat more.',un:'"Full of" something.',cefr:'A1'},
  {w:'clean',h:'साफ़',sm:'free from dirt or contamination',ipa:'/kliːn/',vf:{base:'clean',s3:'cleans',ing:'cleaning',past:'cleaned',pp:'cleaned'},syn:['neat','spotless','tidy'],ant:['dirty','filthy'],daily:'The room is clean.',office:'Keep the workspace clean.',interview:'-',business:'-',formal:'Cleanliness is mandatory.',informal:'Is your room clean?',un:'Adjective and verb.',cefr:'A1'},
  {w:'dirty',h:'गंदा',sm:'covered in dirt; not clean',ipa:'/ˈdɜːrti/',vf:{base:'dirty',s3:'dirties',ing:'dirtying',past:'dirtied',pp:'dirtied'},syn:['filthy','soiled','messy'],ant:['clean','spotless'],daily:'His shoes are dirty.',office:'-',interview:'-',business:'-',formal:'-',informal:'Your hands are so dirty!',un:'Adjective and informal verb.',cefr:'A1'},
  {w:'new',h:'नया',sm:'recently made, bought, or discovered',ipa:'/njuː/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fresh','recent','modern'],ant:['old','used'],daily:'This is a new phone.',office:'She is the new manager.',interview:'-',business:'Our new product is ready.',formal:'He is the new appointee.',informal:'I got a new haircut!',un:'"New to" = unfamiliar with.',cefr:'A1'},
  {w:'old',h:'पुराना/बूढ़ा',sm:'not new; or of great age (person)',ipa:'/oʊld/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['aged','ancient','elderly'],ant:['new','young'],daily:'This building is very old.',office:'He is an old employee.',interview:'-',business:'-',formal:'He is an old and respected colleague.',informal:'This car is so old!',un:'"Old" for age of things and people.',cefr:'A1'},
  {w:'young',h:'जवान',sm:'having lived for a short time; not old',ipa:'/jʌŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['youthful','juvenile'],ant:['old','elderly'],daily:'She is very young.',office:'We need young talent.',interview:'-',business:'-',formal:'He is a young but capable leader.',informal:'She\'s so young!',un:'"Young" for people; "new/fresh" for things.',cefr:'A1'},
  {w:'rich',h:'अमीर',sm:'having a lot of money or resources',ipa:'/rɪtʃ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['wealthy','affluent','prosperous'],ant:['poor','penniless'],daily:'He is very rich.',office:'-',interview:'-',business:'This is a rich market.',formal:'He is a rich and powerful businessman.',informal:'He\'s so rich, no worries!',un:'"Rich in" = having a lot of something (rich in minerals).',cefr:'A1'},
  {w:'poor',h:'गरीब',sm:'lacking money or resources',ipa:'/pɔːr/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['destitute','needy'],ant:['rich','wealthy'],daily:'They were poor before.',office:'-',interview:'-',business:'-',formal:'He comes from a poor background.',informal:'I was so poor in college.',un:'"Poor at" = not skilled at something.',cefr:'A1'},
  {w:'famous',h:'प्रसिद्ध',sm:'known by many people',ipa:'/ˈfeɪməs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['well-known','renowned','celebrated'],ant:['unknown','obscure'],daily:'She is a famous actress.',office:'-',interview:'-',business:'This is a famous brand.',formal:'He is a famous scientist.',informal:'She\'s famous in our college.',un:'"Famous for" something.',cefr:'A2'},
  {w:'popular',h:'लोकप्रिय',sm:'liked or admired by many people',ipa:'/ˈpɒpjʊlər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['well-liked','in demand'],ant:['unpopular'],daily:'That teacher is very popular.',office:'This product is very popular.',interview:'-',business:'We are popular in the market.',formal:'He is a popular public figure.',informal:'She\'s so popular in school.',un:'"Popular with" a group.',cefr:'A2'},
  {w:'strong',h:'मज़बूत',sm:'having great physical or mental power',ipa:'/strɒŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['powerful','sturdy','robust'],ant:['weak'],daily:'He is very strong.',office:'She is strong under pressure.',interview:'I am a strong communicator.',business:'We have a strong market position.',formal:'He is a strong and decisive leader.',informal:'You\'re so strong!',un:'"Strong in/at" something.',cefr:'A1'},
  {w:'weak',h:'कमज़ोर',sm:'lacking physical or mental strength',ipa:'/wiːk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['feeble','frail'],ant:['strong','powerful'],daily:'I was weak after the illness.',office:'-',interview:'-',business:'The market is weak.',formal:'-',informal:'Don\'t be weak, get up!',un:'"Weak at" = not skilled in.',cefr:'A1'},
  {w:'fast',h:'तेज़',sm:'moving or able to move quickly',ipa:'/fɑːst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['quick','rapid','swift'],ant:['slow'],daily:'He is a fast runner.',office:'She is a fast learner.',interview:'I am a fast and efficient worker.',business:'-',formal:'The system is fast and reliable.',informal:'He\'s super fast!',un:'"Fast" as adjective and adverb.',cefr:'A1'},
  {w:'slow',h:'धीमा',sm:'moving or happening at a low speed',ipa:'/sloʊ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['gradual','unhurried'],ant:['fast','quick'],daily:'This bus is very slow.',office:'The process is slow.',interview:'-',business:'-',formal:'Progress was slow initially.',informal:'This is so slow!',un:'"Slow at" something = not quick at it.',cefr:'A1'},
  {w:'expensive',h:'महँगा',sm:'costing a lot of money',ipa:'/ɪkˈspɛnsɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['costly','pricey'],ant:['cheap','affordable'],daily:'This phone is very expensive.',office:'-',interview:'-',business:'The equipment is expensive.',formal:'The proposal is too expensive.',informal:'That\'s way too expensive!',un:'"Expensive" for things.',cefr:'A1'},
  {w:'affordable',h:'सस्ती/किफ़ायती',sm:'inexpensive enough for most people',ipa:'/əˈfɔːrdəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['cheap','reasonable','budget-friendly'],ant:['expensive','costly'],daily:'This hotel is affordable.',office:'-',interview:'-',business:'We offer affordable pricing.',formal:'The solution must be affordable.',informal:'Finally something affordable!',un:'"Affordable for" a group.',cefr:'B1'},
  {w:'delicious',h:'स्वादिष्ट',sm:'extremely pleasant to taste',ipa:'/dɪˈlɪʃəs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['tasty','yummy','scrumptious'],ant:['tasteless','bland'],daily:'The food is delicious.',office:'-',interview:'-',business:'-',formal:'-',informal:'This is so delicious!',un:'"Delicious" mainly for food.',cefr:'A2'},
  {w:'interesting',h:'दिलचस्प',sm:'holding attention; exciting curiosity',ipa:'/ˈɪntrəstɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fascinating','engaging','intriguing'],ant:['boring','dull'],daily:'This book is interesting.',office:'That is an interesting idea.',interview:'This is an interesting opportunity.',business:'The market trend is interesting.',formal:'He made an interesting observation.',informal:'Wow, that\'s interesting!',un:'"Interesting to" someone; "interested in" = personal feeling.',cefr:'A2'},
  {w:'boring',h:'उबाऊ',sm:'not interesting; dull',ipa:'/ˈbɔːrɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['dull','tedious','monotonous'],ant:['interesting','exciting'],daily:'This job is boring.',office:'The lecture was boring.',interview:'-',business:'-',formal:'-',informal:'This film is so boring!',un:'"Boring" describes things; "bored" describes people.',cefr:'A2'},
  {w:'difficult',h:'कठिन',sm:'not easy to do or understand',ipa:'/ˈdɪfɪkəlt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['hard','challenging','tough'],ant:['easy','simple'],daily:'This exam is very difficult.',office:'The project is quite difficult.',interview:'I enjoy difficult challenges.',business:'The market is difficult to penetrate.',formal:'The situation is difficult.',informal:'This is so difficult!',un:'"Difficult for" someone.',cefr:'A1'},
  {w:'easy',h:'आसान',sm:'not requiring much effort',ipa:'/ˈiːzi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['simple','straightforward','effortless'],ant:['difficult','hard'],daily:'This lesson is easy.',office:'The process is easy to follow.',interview:'I find communication easy.',business:'Our platform is easy to use.',formal:'The task is relatively easy.',informal:'That\'s so easy!',un:'"Easy for" someone.',cefr:'A1'},
  {w:'modern',h:'आधुनिक',sm:'relating to the present time; up to date',ipa:'/ˈmɒdərn/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['contemporary','current','new'],ant:['old-fashioned','traditional'],daily:'This is a modern city.',office:'Our office is very modern.',interview:'-',business:'We use modern technology.',formal:'The facility is modern and well-equipped.',informal:'Their house is so modern!',un:'"Modern" for things and ideas.',cefr:'A2'},
  {w:'traditional',h:'पारंपरिक',sm:'following old customs and values',ipa:'/trəˈdɪʃənl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['conventional','classical'],ant:['modern','contemporary'],daily:'My family is very traditional.',office:'-',interview:'-',business:'We have traditional values.',formal:'He comes from a traditional background.',informal:'My parents are very traditional.',un:'"Traditional" for culture, methods.',cefr:'B1'},
  {w:'digital',h:'डिजिटल',sm:'relating to electronic technology; using computers',ipa:'/ˈdɪdʒɪtl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['electronic','online','tech'],ant:['analog','offline'],daily:'I am a digital learner.',office:'We are in a digital workplace.',interview:'I am skilled in digital marketing.',business:'Digital transformation is key.',formal:'He is a digital native.',informal:'Everything is digital now.',un:'"Digital" in tech and business context.',cefr:'B1'},
  {w:'global',h:'वैश्विक',sm:'relating to the whole world',ipa:'/ˈɡloʊbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['worldwide','international'],ant:['local','domestic'],daily:'-',office:'We are a global company.',interview:'-',business:'We have a global presence.',formal:'This is a global issue.',informal:'-',un:'"Global" for worldwide context.',cefr:'B1'},
  {w:'local',h:'स्थानीय',sm:'relating to a particular area',ipa:'/ˈloʊkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['regional','nearby'],ant:['global','national'],daily:'This is a local market.',office:'-',interview:'-',business:'We are a local brand.',formal:'The local government is responsible.',informal:'My local café is the best.',un:'"Local to" an area.',cefr:'A2'},
  {w:'technical',h:'तकनीकी',sm:'relating to a specific subject or technology',ipa:'/ˈtɛknɪkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['technological','specialized'],ant:['non-technical'],daily:'-',office:'She is in a technical role.',interview:'I have a technical background.',business:'We provide technical support.',formal:'He is a technical expert.',informal:'It\'s too technical for me.',un:'"Technical" background/knowledge.',cefr:'B1'},
  {w:'practical',h:'व्यावहारिक',sm:'useful in real-life situations',ipa:'/ˈpræktɪkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['useful','functional','realistic'],ant:['impractical','theoretical'],daily:'I am a practical person.',office:'We need a practical solution.',interview:'I prefer practical experience.',business:'This plan is very practical.',formal:'He is a practical and results-oriented leader.',informal:'That\'s very practical!',un:'"Practical" for real-world utility.',cefr:'B1'},
  {w:'theoretical',h:'सैद्धांतिक',sm:'relating to theory rather than practice',ipa:'/ˌθɪəˈrɛtɪkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['academic','conceptual'],ant:['practical'],daily:'-',office:'-',interview:'My knowledge is both theoretical and practical.',business:'-',formal:'His approach is more theoretical.',informal:'-',un:'"Theoretical" vs "practical" distinction.',cefr:'B2'},
  {w:'formal',h:'औपचारिक',sm:'relating to official or serious situations',ipa:'/ˈfɔːrml/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['official','ceremonial'],ant:['informal','casual'],daily:'-',office:'This is a formal meeting.',interview:'Use formal English in interviews.',business:'The agreement is formal.',formal:'He is dressed in formal attire.',informal:'This is too formal for a casual chat.',un:'"Formal" for official context.',cefr:'B1'},
  {w:'informal',h:'अनौपचारिक',sm:'relaxed and not following strict rules',ipa:'/ɪnˈfɔːrml/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['casual','relaxed'],ant:['formal'],daily:'This is an informal chat.',office:'Friday is informal dress day.',interview:'-',business:'-',formal:'-',informal:'We\'re keeping it informal today.',un:'"Informal" for casual situations.',cefr:'B1'},
  {w:'verbal',h:'मौखिक',sm:'relating to words, especially spoken words',ipa:'/ˈvɜːrbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['oral','spoken'],ant:['written','non-verbal'],daily:'-',office:'She has excellent verbal skills.',interview:'I have strong verbal communication skills.',business:'-',formal:'He gave verbal confirmation.',informal:'-',un:'"Verbal communication" in interview context.',cefr:'B2'},
  {w:'written',h:'लिखित',sm:'put down in writing',ipa:'/ˈrɪtən/',vf:{base:'write',s3:'writes',ing:'writing',past:'wrote',pp:'written'},syn:['documented','recorded'],ant:['verbal','oral'],daily:'I got a written complaint.',office:'Please give written confirmation.',interview:'-',business:'We need a written agreement.',formal:'The terms are in written form.',informal:'-',un:'"Written" as adjective (past participle of write).',cefr:'A2'},
  {w:'clear',h:'स्पष्ट',sm:'easy to understand; transparent',ipa:'/klɪər/',vf:{base:'clear',s3:'clears',ing:'clearing',past:'cleared',pp:'cleared'},syn:['obvious','evident','plain'],ant:['unclear','confusing'],daily:'Your instructions are clear.',office:'Please be clear in your report.',interview:'I am a clear communicator.',business:'The goal is clear.',formal:'The guidelines are clear.',informal:'Make it clear, please.',un:'"Clear about" something.',cefr:'A2'},
  {w:'fluent',h:'धाराप्रवाह',sm:'able to speak a language smoothly and easily',ipa:'/ˈfluːənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['proficient','articulate'],ant:['broken','hesitant'],daily:'I want to be fluent in English.',office:'She is fluent in French.',interview:'I am fluent in Hindi and English.',business:'-',formal:'He speaks fluent German.',informal:'She\'s so fluent!',un:'"Fluent in" a language.',cefr:'B1'},
  {w:'bilingual',h:'द्विभाषी',sm:'able to speak two languages',ipa:'/baɪˈlɪŋɡwəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['multilingual'],ant:['monolingual'],daily:'I am bilingual.',office:'We need a bilingual employee.',interview:'I am bilingual in Hindi and English.',business:'-',formal:'He is a bilingual speaker.',informal:'She\'s bilingual, so impressive.',un:'"Bilingual" = two languages.',cefr:'B2'},
  {w:'articulate',h:'स्पष्टवक्ता',sm:'able to express ideas clearly in speech',ipa:'/ɑːrˈtɪkjʊlɪt/',vf:{base:'articulate',s3:'articulates',ing:'articulating',past:'articulated',pp:'articulated'},syn:['eloquent','well-spoken'],ant:['inarticulate'],daily:'-',office:'She is very articulate.',interview:'I am articulate and confident.',business:'-',formal:'He is an articulate speaker.',informal:'She\'s so articulate!',un:'"Articulate" = speaks clearly and well.',cefr:'C1'},
  {w:'eloquent',h:'वाक्पटु',sm:'fluent or persuasive in speaking or writing',ipa:'/ˈɛləkwənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['articulate','expressive'],ant:['inarticulate'],daily:'-',office:'-',interview:'-',business:'-',formal:'He was an eloquent speaker.',informal:'-',un:'"Eloquent" is more formal.',cefr:'C1'},
  {w:'optimistic',h:'आशावादी',sm:'hopeful and confident about the future',ipa:'/ˌɒptɪˈmɪstɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['hopeful','positive'],ant:['pessimistic'],daily:'I am always optimistic.',office:'She is optimistic about the project.',interview:'I am optimistic about my future.',business:'We are optimistic about growth.',formal:'He has an optimistic outlook.',informal:'Stay optimistic!',un:'"Optimistic about" something.',cefr:'B1'},
  {w:'pessimistic',h:'निराशावादी',sm:'tending to see the worst in things',ipa:'/ˌpɛsɪˈmɪstɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['negative','gloomy'],ant:['optimistic'],daily:'Don\'t be so pessimistic.',office:'-',interview:'-',business:'-',formal:'-',informal:'Stop being so pessimistic!',un:'"Pessimistic about" something.',cefr:'B2'},
  {w:'realistic',h:'यथार्थवादी',sm:'having a sensible view of things',ipa:'/ˌrɪəˈlɪstɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['practical','sensible'],ant:['unrealistic'],daily:'I am realistic about my goals.',office:'Let\'s be realistic about deadlines.',interview:'I am realistic and practical.',business:'Our projections are realistic.',formal:'A realistic assessment is required.',informal:'Be realistic, okay?',un:'"Realistic about" something.',cefr:'B1'},
  {w:'energetic',h:'ऊर्जावान',sm:'having great energy and enthusiasm',ipa:'/ˌɛnərˈdʒɛtɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['lively','active','dynamic'],ant:['lethargic','tired'],daily:'She is very energetic.',office:'We need energetic team members.',interview:'I am energetic and enthusiastic.',business:'-',formal:'He is an energetic leader.',informal:'You\'re so energetic!',un:'"Energetic" = full of energy.',cefr:'B1'},
  {w:'positive',h:'सकारात्मक',sm:'good or constructive; optimistic',ipa:'/ˈpɒzɪtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['optimistic','constructive'],ant:['negative'],daily:'I always try to be positive.',office:'Keep a positive attitude at work.',interview:'I am positive and solution-focused.',business:'The feedback is positive.',formal:'He has a positive influence.',informal:'Stay positive!',un:'"Positive" attitude/feedback.',cefr:'A2'},
  {w:'negative',h:'नकारात्मक',sm:'expressing refusal or absence; not positive',ipa:'/ˈnɛɡətɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['pessimistic','contradictory'],ant:['positive'],daily:'Avoid negative thoughts.',office:'The review was negative.',interview:'-',business:'-',formal:'The test result was negative.',informal:'Don\'t be so negative!',un:'"Negative" in grammar = not.',cefr:'A2'},
  {w:'logical',h:'तार्किक',sm:'using clear reasoning',ipa:'/ˈlɒdʒɪkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['rational','sensible'],ant:['illogical'],daily:'-',office:'Her approach is very logical.',interview:'I am logical and analytical.',business:'A logical strategy is important.',formal:'He is a logical thinker.',informal:'That\'s not very logical.',un:'"Logical" = follows clear reasoning.',cefr:'B1'},
  {w:'analytical',h:'विश्लेषणात्मक',sm:'using analysis; good at examining data',ipa:'/ˌænəˈlɪtɪkl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['systematic','logical'],ant:[],daily:'-',office:'She has strong analytical skills.',interview:'I am analytical and data-driven.',business:'Analytical thinking is essential.',formal:'He is an analytical professional.',informal:'-',un:'"Analytical" in interview context.',cefr:'B2'},
  {w:'strategic',h:'रणनीतिक',sm:'relating to a plan designed to achieve a goal',ipa:'/strəˈtiːdʒɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['planned','tactical'],ant:['unplanned'],daily:'-',office:'She is in a strategic role.',interview:'I am a strategic thinker.',business:'We are focused on strategic growth.',formal:'He is a strategic advisor.',informal:'-',un:'"Strategic" in business context.',cefr:'B2'},
  {w:'collaborative',h:'सहयोगी',sm:'involving working jointly with others',ipa:'/kəˈlæbərətɪv/',vf:{base:'collaborate',s3:'collaborates',ing:'collaborating',past:'collaborated',pp:'collaborated'},syn:['cooperative','team-oriented'],ant:['solo','independent'],daily:'-',office:'We have a collaborative environment.',interview:'I am a collaborative team member.',business:'Collaborative work drives innovation.',formal:'He is a collaborative leader.',informal:'-',un:'"Collaborative" = likes working with others.',cefr:'B2'},
  {w:'independent',h:'स्वतंत्र',sm:'not relying on others; self-sufficient',ipa:'/ˌɪndɪˈpɛndənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['self-sufficient','autonomous'],ant:['dependent','reliant'],daily:'I am financially independent.',office:'She is an independent worker.',interview:'I am independent and also a team player.',business:'-',formal:'He is an independent consultant.',informal:'I\'m finally independent!',un:'"Independent of" reliance.',cefr:'B1'},
  {w:'competent',h:'सक्षम',sm:'having the required skills or abilities',ipa:'/ˈkɒmpɪtənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['capable','qualified','skilled'],ant:['incompetent'],daily:'-',office:'She is a competent employee.',interview:'I am competent and ready to contribute.',business:'Our team is highly competent.',formal:'He is a competent administrator.',informal:'-',un:'"Competent in/at" something.',cefr:'B2'},
  {w:'capable',h:'काबिल',sm:'having the ability to do something well',ipa:'/ˈkeɪpəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['able','competent','skilled'],ant:['incapable'],daily:'I am capable of handling this.',office:'She is a capable manager.',interview:'I am capable of meeting targets.',business:'Our team is very capable.',formal:'He is a capable and experienced officer.',informal:'I know I\'m capable!',un:'"Capable of" + gerund.',cefr:'B1'},
  {w:'accountable',h:'जवाबदेह',sm:'responsible for one\'s actions or decisions',ipa:'/əˈkaʊntəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['responsible','liable'],ant:['unaccountable'],daily:'-',office:'Everyone is accountable for their work.',interview:'I believe in being accountable.',business:'Leadership must be accountable.',formal:'He is accountable to the board.',informal:'-',un:'"Accountable to" someone or "for" something.',cefr:'B2'},
  {w:'transparent',h:'पारदर्शी',sm:'open and honest; easy to see through',ipa:'/trænsˈpærənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['open','clear','honest'],ant:['opaque','secretive'],daily:'-',office:'We are transparent in our processes.',interview:'I am transparent about my work.',business:'Transparency builds trust.',formal:'He is transparent in his dealings.',informal:'-',un:'"Transparent about" something.',cefr:'B2'},
  {w:'trustworthy',h:'विश्वसनीय',sm:'able to be relied on as honest and truthful',ipa:'/ˈtrʌstwɜːrði/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['reliable','dependable','honest'],ant:['untrustworthy'],daily:'I am trustworthy.',office:'She is a trustworthy colleague.',interview:'I am trustworthy and professional.',business:'-',formal:'He is a trustworthy partner.',informal:'I trust him completely, he\'s trustworthy.',un:'"Trustworthy" = can be trusted.',cefr:'B1'},
  {w:'approachable',h:'मिलनसार/सुलभ',sm:'easy to talk to; friendly',ipa:'/əˈproʊtʃəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['friendly','accessible'],ant:['unapproachable'],daily:'-',office:'The manager is very approachable.',interview:'I am approachable and easy to work with.',business:'-',formal:'He is approachable and open to ideas.',informal:'-',un:'"Approachable" = welcoming manner.',cefr:'B2'},
  {w:'empathetic',h:'सहानुभूतिपूर्ण',sm:'able to understand and share the feelings of others',ipa:'/ˌɛmpəˈθɛtɪk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['understanding','compassionate'],ant:['indifferent'],daily:'-',office:'-',interview:'I am empathetic and people-oriented.',business:'-',formal:'A good leader is empathetic.',informal:'-',un:'"Empathetic" = feels what others feel.',cefr:'C1'},
  {w:'assertive',h:'दृढ़तापूर्वक बोलने वाला',sm:'confident and direct in expressing opinions',ipa:'/əˈsɜːrtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['confident','direct','bold'],ant:['passive','meek'],daily:'-',office:'Be assertive in meetings.',interview:'I am assertive but respectful.',business:'-',formal:'He is assertive and clear.',informal:'-',un:'"Assertive" = confident but not aggressive.',cefr:'C1'},
  {w:'respectful',h:'आदरणीय',sm:'showing respect to others',ipa:'/rɪˈspɛktfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['courteous','polite'],ant:['disrespectful','rude'],daily:'I am always respectful.',office:'Be respectful to all colleagues.',interview:'I am respectful of all viewpoints.',business:'-',formal:'He is respectful and professional.',informal:'She\'s so respectful.',un:'"Respectful of/towards" someone.',cefr:'B1'},
  {w:'helpful',h:'सहायक',sm:'giving or ready to give help',ipa:'/ˈhɛlpfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['useful','supportive'],ant:['unhelpful'],daily:'He is always helpful.',office:'She is helpful and cooperative.',interview:'I am helpful and a team player.',business:'Our support team is very helpful.',formal:'He was helpful throughout the process.',informal:'You\'re so helpful, thanks!',un:'"Helpful to/with" someone.',cefr:'A2'},
  {w:'supportive',h:'सहयोगी',sm:'giving encouragement and emotional help',ipa:'/səˈpɔːrtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['helpful','encouraging'],ant:['unsupportive'],daily:'My family is very supportive.',office:'Our manager is supportive.',interview:'I am supportive of my team.',business:'We are supportive of innovation.',formal:'He is supportive of the initiative.',informal:'She\'s so supportive!',un:'"Supportive of" someone.',cefr:'B1'},
];

function buildVocab(data) {
  return data.map((w, i) => ({
    id: i + 1,
    word: w.w,
    hindi: w.h,
    simpleMeaning: w.sm,
    ipa: w.ipa,
    verbForms: w.vf,
    synonyms: w.syn,
    antonyms: w.ant,
    sentences: {
      daily: w.daily || '-',
      office: w.office || '-',
      interview: w.interview || '-',
      business: w.business || '-',
      formal: w.formal || '-',
      informal: w.informal || '-',
    },
    usageNote: w.un,
    cefrLevel: w.cefr
  }));
}

// Pad to 950 by generating more adjective/occupation/location vocabulary
const extraVocabData = [
  {w:'punctuality',h:'समयनिष्ठा',sm:'the quality of being on time',ipa:'/ˌpʌŋktʃuˈælɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['timeliness','promptness'],ant:['lateness'],daily:'Punctuality is a good habit.',office:'Punctuality is valued at work.',interview:'Punctuality is one of my strengths.',business:'-',formal:'He is known for his punctuality.',informal:'I appreciate your punctuality.',un:'Noun form of "punctual".',cefr:'B1'},
  {w:'reliability',h:'विश्वसनीयता',sm:'the quality of being dependable',ipa:'/rɪˌlaɪəˈbɪlɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['dependability','trustworthiness'],ant:['unreliability'],daily:'-',office:'Reliability is key in this role.',interview:'My reliability is my biggest asset.',business:'-',formal:'The reliability of data is crucial.',informal:'-',un:'Noun of "reliable".',cefr:'B2'},
  {w:'honesty',h:'ईमानदारी',sm:'the quality of being truthful',ipa:'/ˈɒnɪsti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['integrity','sincerity'],ant:['dishonesty'],daily:'Honesty is the best policy.',office:'I value honesty at work.',interview:'Honesty is one of my key values.',business:'Honesty builds client trust.',formal:'He is known for his honesty.',informal:'Always be honest.',un:'Noun of "honest".',cefr:'A2'},
  {w:'integrity',h:'सत्यनिष्ठा',sm:'strong moral principles; honesty and uprightness',ipa:'/ɪnˈtɛɡrɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['honesty','virtue'],ant:['dishonesty'],daily:'-',office:'Integrity is non-negotiable here.',interview:'I value integrity above all.',business:'Business integrity matters.',formal:'He is a person of great integrity.',informal:'-',un:'"Integrity" in professional context.',cefr:'B2'},
  {w:'compassion',h:'करुणा',sm:'concern for the suffering of others',ipa:'/kəmˈpæʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['empathy','sympathy'],ant:['indifference'],daily:'I am a person of compassion.',office:'-',interview:'I lead with compassion.',business:'-',formal:'He showed compassion in difficult times.',informal:'-',un:'"Compassion for" someone.',cefr:'B2'},
  {w:'ambition',h:'महत्वाकांक्षा',sm:'strong desire to achieve something',ipa:'/æmˈbɪʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['aspiration','drive'],ant:['apathy'],daily:'Ambition is important in life.',office:'-',interview:'My ambition is to become a team lead.',business:'-',formal:'He is driven by ambition.',informal:'Your ambition is inspiring.',un:'"Ambition to" + verb.',cefr:'B1'},
  {w:'passion',h:'जुनून',sm:'strong enthusiasm for something',ipa:'/ˈpæʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['zeal','enthusiasm'],ant:['indifference'],daily:'My passion is music.',office:'-',interview:'My passion for data drives me.',business:'-',formal:'He has a passion for excellence.',informal:'Her passion is cooking.',un:'"Passion for" something.',cefr:'B1'},
  {w:'determination',h:'दृढ़ संकल्प',sm:'firm decision and will to do something',ipa:'/dɪˌtɜːrmɪˈneɪʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['resolve','persistence'],ant:['indecision'],daily:'-',office:'-',interview:'My determination sets me apart.',business:'-',formal:'He is known for his determination.',informal:'Your determination is admirable.',un:'"Determination to" + verb.',cefr:'B1'},
  {w:'persistence',h:'दृढ़ता',sm:'continuing firmly despite difficulties',ipa:'/pərˈsɪstəns/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['perseverance','tenacity'],ant:['giving up'],daily:'-',office:'-',interview:'My persistence is my key strength.',business:'-',formal:'Persistence leads to success.',informal:'Your persistence paid off.',un:'"Persistence in" doing something.',cefr:'B2'},
  {w:'courage',h:'साहस',sm:'the ability to do something despite fear',ipa:'/ˈkɜːrɪdʒ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['bravery','boldness'],ant:['cowardice'],daily:'It takes courage to speak up.',office:'-',interview:'-',business:'-',formal:'He displayed great courage.',informal:'That took a lot of courage.',un:'"Courage to" + verb.',cefr:'B1'},
  {w:'wisdom',h:'बुद्धिमत्ता',sm:'the ability to make good judgments from experience',ipa:'/ˈwɪzdəm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['insight','knowledge'],ant:['foolishness'],daily:'-',office:'-',interview:'-',business:'-',formal:'He is a person of great wisdom.',informal:'-',un:'"Wisdom" is gained through experience.',cefr:'B2'},
  {w:'leadership',h:'नेतृत्व',sm:'the ability to guide and manage others',ipa:'/ˈliːdərʃɪp/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['guidance','management'],ant:[],daily:'-',office:'Strong leadership is important.',interview:'I have strong leadership skills.',business:'Our leadership team is experienced.',formal:'He demonstrated excellent leadership.',informal:'She was born for leadership.',un:'"Leadership skills" in interview.',cefr:'B2'},
  {w:'communication',h:'संचार',sm:'the act of sharing information',ipa:'/kəˌmjuːnɪˈkeɪʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['interaction','correspondence'],ant:[],daily:'Good communication is important.',office:'Communication is key at work.',interview:'I have excellent communication skills.',business:'Clear communication avoids mistakes.',formal:'Effective communication is valued.',informal:'Just communicate better!',un:'"Communication skills" = interview phrase.',cefr:'A2'},
  {w:'teamwork',h:'सहकार्य',sm:'working jointly with a group',ipa:'/ˈtiːmwɜːrk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['collaboration','cooperation'],ant:['solo work'],daily:'-',office:'Teamwork is our strength.',interview:'I believe in teamwork.',business:'Teamwork drives results.',formal:'Effective teamwork is essential.',informal:'Teamwork makes the dream work!',un:'"Teamwork" is a compound noun.',cefr:'A2'},
  {w:'creativity',h:'रचनात्मकता',sm:'the ability to use imagination to create',ipa:'/ˌkriːeɪˈtɪvɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['imagination','innovation'],ant:['unoriginality'],daily:'-',office:'Creativity is valued here.',interview:'My creativity is my biggest strength.',business:'Creativity drives innovation.',formal:'He is recognized for his creativity.',informal:'Your creativity is amazing.',un:'Noun of "creative".',cefr:'B1'},
  {w:'innovation',h:'नवाचार',sm:'introducing new ideas or methods',ipa:'/ˌɪnəˈveɪʃən/',vf:{base:'innovate',s3:'innovates',ing:'innovating',past:'innovated',pp:'innovated'},syn:['creativity','invention'],ant:['tradition'],daily:'-',office:'Innovation is our priority.',interview:'I am driven by innovation.',business:'Innovation is key to growth.',formal:'He championed innovation.',informal:'-',un:'"Innovation in" a field.',cefr:'B2'},
  {w:'performance',h:'प्रदर्शन',sm:'how well someone or something functions',ipa:'/pərˈfɔːrməns/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['execution','output'],ant:[],daily:'-',office:'My performance was rated excellent.',interview:'My performance speaks for itself.',business:'Business performance is measurable.',formal:'His performance was commendable.',informal:'Good performance!',un:'"Performance review" is common at work.',cefr:'B1'},
  {w:'achievement',h:'उपलब्धि',sm:'something accomplished successfully',ipa:'/əˈtʃiːvmənt/',vf:{base:'achieve',s3:'achieves',ing:'achieving',past:'achieved',pp:'achieved'},syn:['accomplishment','success'],ant:['failure'],daily:'My biggest achievement is my degree.',office:'-',interview:'My proudest achievement is the award.',business:'-',formal:'His achievements are recognized.',informal:'That\'s a huge achievement!',un:'"Achievement" is countable.',cefr:'B1'},
  {w:'improvement',h:'सुधार',sm:'the process of making something better',ipa:'/ɪmˈpruːvmənt/',vf:{base:'improve',s3:'improves',ing:'improving',past:'improved',pp:'improved'},syn:['progress','advancement'],ant:['deterioration'],daily:'I am seeing improvement.',office:'There is room for improvement.',interview:'Continuous improvement is my goal.',business:'We track improvement metrics.',formal:'Significant improvement was noted.',informal:'I see improvement!',un:'"Improvement in" something.',cefr:'B1'},
  {w:'development',h:'विकास',sm:'the process of growing or improving',ipa:'/dɪˈvɛləpmənt/',vf:{base:'develop',s3:'develops',ing:'developing',past:'developed',pp:'developed'},syn:['growth','progress'],ant:['decline'],daily:'Self-development is important.',office:'Career development is a priority.',interview:'I focus on personal development.',business:'Business development is my strength.',formal:'He oversees product development.',informal:'I\'m all about development.',un:'"Development of" something.',cefr:'A2'},
  {w:'progress',h:'प्रगति',sm:'forward movement towards a goal',ipa:'/ˈprɒɡrɛs/',vf:{base:'progress',s3:'progresses',ing:'progressing',past:'progressed',pp:'progressed'},syn:['advancement','improvement'],ant:['regression'],daily:'I am making progress.',office:'Project progress is on track.',interview:'I am always focused on progress.',business:'We track progress weekly.',formal:'Significant progress was made.',informal:'Good progress so far!',un:'"Progress on" a task.',cefr:'A2'},
  {w:'opportunity',h:'अवसर',sm:'a time or set of circumstances that makes it possible to do something',ipa:'/ˌɒpərˈtjuːnɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['chance','opening'],ant:['obstacle'],daily:'This is a great opportunity.',office:'I am glad for this opportunity.',interview:'I am excited about this opportunity.',business:'There is a big opportunity here.',formal:'He seized the opportunity.',informal:'Don\'t miss this opportunity!',un:'"Opportunity to" + verb.',cefr:'B1'},
  {w:'challenge',h:'चुनौती',sm:'something difficult that tests one\'s abilities',ipa:'/ˈtʃælɪndʒ/',vf:{base:'challenge',s3:'challenges',ing:'challenging',past:'challenged',pp:'challenged'},syn:['difficulty','test'],ant:['ease'],daily:'I enjoy a good challenge.',office:'This project is a challenge.',interview:'I am ready for any challenge.',business:'Market challenges are real.',formal:'He rose to every challenge.',informal:'Bring it on, I love a challenge!',un:'"Challenge of/for" something.',cefr:'B1'},
  {w:'deadline',h:'समय-सीमा',sm:'the time by which something must be done',ipa:'/ˈdɛdlaɪn/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['due date','cutoff'],ant:[],daily:'-',office:'The deadline is Friday.',interview:'I always meet deadlines.',business:'The client\'s deadline is tight.',formal:'The deadline must be respected.',informal:'I\'m stressed about this deadline.',un:'"Meet a deadline" = finish on time.',cefr:'B1'},
  {w:'target',h:'लक्ष्य',sm:'an objective or goal to be achieved',ipa:'/ˈtɑːrɡɪt/',vf:{base:'target',s3:'targets',ing:'targeting',past:'targeted',pp:'targeted'},syn:['goal','aim','objective'],ant:[],daily:'My target is to read daily.',office:'She met her sales target.',interview:'I always meet my targets.',business:'We set ambitious targets.',formal:'Targets were exceeded last quarter.',informal:'Almost at my target!',un:'"Meet/hit a target".',cefr:'A2'},
  {w:'feedback',h:'प्रतिक्रिया',sm:'information about reactions to one\'s performance',ipa:'/ˈfiːdbæk/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['response','review'],ant:[],daily:'-',office:'I am open to feedback.',interview:'I welcome feedback.',business:'Customer feedback is valuable.',formal:'Feedback was positive.',informal:'Give me feedback, please.',un:'"Feedback on" something.',cefr:'B1'},
  {w:'salary',h:'वेतन',sm:'a fixed regular payment for work',ipa:'/ˈsæləri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['pay','income','wages'],ant:[],daily:'-',office:'My salary is credited monthly.',interview:'My expected salary is competitive.',business:'-',formal:'The salary package is finalized.',informal:'What\'s your salary?',un:'"Salary package" = full compensation.',cefr:'A2'},
  {w:'promotion',h:'पदोन्नति',sm:'being moved to a higher position at work',ipa:'/prəˈmoʊʃən/',vf:{base:'promote',s3:'promotes',ing:'promoting',past:'promoted',pp:'promoted'},syn:['advancement','elevation'],ant:['demotion'],daily:'-',office:'She got a promotion.',interview:'I am looking for a promotion.',business:'-',formal:'He was promoted to director.',informal:'Congrats on the promotion!',un:'"Promotion to" a position.',cefr:'B1'},
  {w:'interview',h:'साक्षात्कार',sm:'a formal meeting to assess someone\'s suitability',ipa:'/ˈɪntərvjuː/',vf:{base:'interview',s3:'interviews',ing:'interviewing',past:'interviewed',pp:'interviewed'},syn:['meeting','assessment'],ant:[],daily:'-',office:'-',interview:'I am here for a job interview.',business:'-',formal:'The interview went well.',informal:'How was your interview?',un:'"Interview for" a position.',cefr:'A2'},
  {w:'resume',h:'रेज़्यूमे',sm:'a document showing one\'s education and experience',ipa:'/ˈrɛzjʊmeɪ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['CV','curriculum vitae'],ant:[],daily:'-',office:'-',interview:'My resume is very detailed.',business:'-',formal:'Please submit your resume.',informal:'Update your resume!',un:'"Resume" = American; "CV" = British.',cefr:'B1'},
  {w:'qualification',h:'योग्यता',sm:'a skill or achievement making you suitable',ipa:'/ˌkwɒlɪfɪˈkeɪʃən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['credential','degree'],ant:[],daily:'My highest qualification is B.Tech.',office:'Please list your qualifications.',interview:'My qualification matches the role.',business:'-',formal:'His qualifications are impressive.',informal:'What\'s your qualification?',un:'"Qualifications" plural is common.',cefr:'B1'},
  {w:'training',h:'प्रशिक्षण',sm:'teaching or learning for a specific skill',ipa:'/ˈtreɪnɪŋ/',vf:{base:'train',s3:'trains',ing:'training',past:'trained',pp:'trained'},syn:['preparation','coaching'],ant:[],daily:'-',office:'Training starts on Monday.',interview:'I have completed sales training.',business:'Staff training is ongoing.',formal:'He completed advanced training.',informal:'Training was tough but great.',un:'"Training in" a skill.',cefr:'A2'},
  {w:'skill',h:'कौशल',sm:'an ability developed through practice',ipa:'/skɪl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['ability','expertise','competency'],ant:['inability'],daily:'Reading is an important skill.',office:'Her Excel skills are excellent.',interview:'I have strong communication skills.',business:'Technical skills are valued.',formal:'He possesses the required skills.',informal:'You\'ve got great skills.',un:'"Skill in/at" something.',cefr:'A2'},
  {w:'attitude',h:'रवैया',sm:'a settled way of thinking or feeling about something',ipa:'/ˈætɪtjuːd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['mindset','disposition'],ant:[],daily:'A positive attitude helps.',office:'Your attitude at work matters.',interview:'My attitude is positive and professional.',business:'-',formal:'He has the right attitude.',informal:'I love your attitude!',un:'"Attitude towards" something.',cefr:'B1'},
  {w:'confidence',h:'आत्मविश्वास',sm:'belief in oneself and one\'s abilities',ipa:'/ˈkɒnfɪdəns/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['self-assurance','boldness'],ant:['self-doubt','insecurity'],daily:'I have confidence in my abilities.',office:'Confidence is key in presentations.',interview:'I speak with confidence.',business:'Confidence builds client trust.',formal:'He exuded confidence throughout.',informal:'I\'m full of confidence today!',un:'"Confidence in" something.',cefr:'A2'},
  {w:'awareness',h:'जागरूकता',sm:'knowledge and understanding of something',ipa:'/əˈwɛrnɪs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['consciousness','knowledge'],ant:['ignorance'],daily:'Health awareness is important.',office:'Safety awareness is mandatory.',interview:'I have cultural awareness.',business:'Brand awareness is our goal.',formal:'He has great situational awareness.',informal:'-',un:'"Awareness of" something.',cefr:'B2'},
  {w:'capability',h:'क्षमता',sm:'the ability to do something',ipa:'/ˌkeɪpəˈbɪlɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['ability','capacity'],ant:['inability'],daily:'-',office:'I am confident in my capability.',interview:'My capabilities match this role.',business:'We have the capability to deliver.',formal:'His capabilities are well documented.',informal:'-',un:'"Capability to" + verb.',cefr:'B2'},
  {w:'commitment',h:'प्रतिबद्धता',sm:'dedication to a task or cause',ipa:'/kəˈmɪtmənt/',vf:{base:'commit',s3:'commits',ing:'committing',past:'committed',pp:'committed'},syn:['dedication','loyalty'],ant:['indifference'],daily:'I have a commitment to learning.',office:'My commitment to quality is strong.',interview:'I demonstrate commitment in everything.',business:'Our commitment to clients is unwavering.',formal:'He showed unwavering commitment.',informal:'I\'m 100% committed.',un:'"Commitment to" something.',cefr:'B1'},
  {w:'dedication',h:'समर्पण',sm:'strong commitment to a goal or task',ipa:'/ˌdɛdɪˈkeɪʃən/',vf:{base:'dedicate',s3:'dedicates',ing:'dedicating',past:'dedicated',pp:'dedicated'},syn:['commitment','devotion'],ant:['carelessness'],daily:'Dedication leads to success.',office:'Her dedication is admirable.',interview:'My dedication sets me apart.',business:'Dedication to quality is key.',formal:'He showed great dedication.',informal:'Your dedication is inspiring.',un:'"Dedication to" something.',cefr:'B1'},
  {w:'loyalty',h:'वफ़ादारी',sm:'faithfulness to a person or cause',ipa:'/ˈlɔɪəlti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fidelity','devotion'],ant:['disloyalty'],daily:'-',office:'Loyalty is important at work.',interview:'I am loyal to my team.',business:'Customer loyalty is valuable.',formal:'He is known for his loyalty.',informal:'Loyalty matters to me.',un:'"Loyalty to" someone.',cefr:'B1'},
  {w:'adaptability',h:'अनुकूलनशीलता',sm:'ability to adjust to new conditions',ipa:'/əˌdæptəˈbɪlɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['flexibility','versatility'],ant:['rigidity'],daily:'-',office:'-',interview:'My adaptability is a key strength.',business:'-',formal:'He demonstrated great adaptability.',informal:'-',un:'Noun of "adaptable".',cefr:'B2'},
  {w:'productivity',h:'उत्पादकता',sm:'the rate of producing work efficiently',ipa:'/ˌprɒdʌkˈtɪvɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['efficiency','output'],ant:['inefficiency'],daily:'Exercise boosts productivity.',office:'Productivity is up this quarter.',interview:'I focus on maximizing productivity.',business:'Productivity is essential.',formal:'Productivity metrics improved.',informal:'So productive today!',un:'"Productivity" in professional context.',cefr:'B2'},
  {w:'efficiency',h:'दक्षता',sm:'doing things with minimum waste of effort',ipa:'/ɪˈfɪʃənsi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['effectiveness','productivity'],ant:['inefficiency'],daily:'-',office:'Efficiency is valued here.',interview:'I work with high efficiency.',business:'Efficiency reduces costs.',formal:'The efficiency of operations improved.',informal:'-',un:'"Efficiency" in business context.',cefr:'B2'},
  {w:'problem-solving',h:'समस्या-समाधान',sm:'the ability to find solutions to problems',ipa:'/ˈprɒbləm ˈsɒlvɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['troubleshooting','critical thinking'],ant:[],daily:'-',office:'Problem-solving is essential.',interview:'I am good at problem-solving.',business:'We value problem-solving skills.',formal:'He excels in problem-solving.',informal:'You\'re great at problem-solving.',un:'"Problem-solving skills" = interview phrase.',cefr:'B2'},
  {w:'time management',h:'समय प्रबंधन',sm:'the ability to use time effectively',ipa:'/taɪm ˈmænɪdʒmənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['scheduling','prioritizing'],ant:[],daily:'Time management is crucial.',office:'I am good at time management.',interview:'Time management is my top strength.',business:'Time management saves money.',formal:'Excellent time management was demonstrated.',informal:'I need to work on time management.',un:'"Time management skills" = common interview phrase.',cefr:'B1'},
  {w:'multitasking',h:'बहु-कार्य',sm:'doing several tasks at the same time',ipa:'/ˈmʌltiˌtæskɪŋ/',vf:{base:'multitask',s3:'multitasks',ing:'multitasking',past:'multitasked',pp:'multitasked'},syn:['juggling tasks'],ant:['single-tasking'],daily:'-',office:'Multitasking is needed here.',interview:'I am good at multitasking.',business:'-',formal:'Multitasking ability is required.',informal:'I\'m a multitasker.',un:'"Multitasking" ability.',cefr:'B2'},
  {w:'initiative',h:'पहल',sm:'the ability to take action without being told',ipa:'/ɪˈnɪʃɪətɪv/',vf:{base:'initiate',s3:'initiates',ing:'initiating',past:'initiated',pp:'initiated'},syn:['proactiveness','drive'],ant:['passivity'],daily:'-',office:'Take initiative on this project.',interview:'I always take initiative.',business:'Initiative is rewarded here.',formal:'He showed great initiative.',informal:'Take initiative, don\'t wait.',un:'"Take initiative" = proactive action.',cefr:'B2'},
  {w:'networking',h:'नेटवर्किंग',sm:'building professional relationships',ipa:'/ˈnɛtwɜːrkɪŋ/',vf:{base:'network',s3:'networks',ing:'networking',past:'networked',pp:'networked'},syn:['connecting','socializing professionally'],ant:[],daily:'-',office:'-',interview:'I enjoy networking.',business:'Networking opens new doors.',formal:'Networking is essential in business.',informal:'Networking helped me find this job.',un:'"Networking event" = professional gathering.',cefr:'B2'},
  {w:'mentor',h:'मार्गदर्शक',sm:'an experienced person who advises a less experienced one',ipa:'/ˈmɛntɔːr/',vf:{base:'mentor',s3:'mentors',ing:'mentoring',past:'mentored',pp:'mentored'},syn:['guide','advisor','coach'],ant:['mentee'],daily:'-',office:'She is my mentor at work.',interview:'My mentor inspired me.',business:'Find a good business mentor.',formal:'He is a respected mentor.',informal:'She\'s like a mentor to me.',un:'"Mentor" as noun and verb.',cefr:'B2'},
  {w:'growth',h:'विकास/वृद्धि',sm:'the process of increasing or developing',ipa:'/ɡroʊθ/',vf:{base:'grow',s3:'grows',ing:'growing',past:'grew',pp:'grown'},syn:['development','expansion'],ant:['decline'],daily:'-',office:'Career growth is important.',interview:'I seek professional growth.',business:'Revenue growth is our target.',formal:'Significant growth was achieved.',informal:'I see so much growth in you!',un:'"Growth in" a field.',cefr:'A2'},
  {w:'mindset',h:'मानसिकता',sm:'a way of thinking; a fixed set of attitudes',ipa:'/ˈmaɪndset/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['attitude','perspective'],ant:[],daily:'A growth mindset is key.',office:'Have a positive mindset.',interview:'I have a positive mindset.',business:'Entrepreneurial mindset matters.',formal:'He has the right mindset.',informal:'Fix your mindset!',un:'"Growth mindset" vs "fixed mindset".',cefr:'B2'},
  {w:'empathy',h:'सहानुभूति',sm:'understanding and sharing the feelings of others',ipa:'/ˈɛmpəθi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['compassion','understanding'],ant:['indifference'],daily:'-',office:'Empathy is important in leadership.',interview:'I lead with empathy.',business:'-',formal:'He is known for his empathy.',informal:'-',un:'"Empathy for/towards" someone.',cefr:'C1'},
  {w:'resilience',h:'लचीलापन/दृढ़ता',sm:'the ability to recover from difficulties',ipa:'/rɪˈzɪliəns/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['toughness','adaptability'],ant:['fragility'],daily:'-',office:'-',interview:'Resilience is one of my strengths.',business:'-',formal:'He demonstrated great resilience.',informal:'-',un:'"Resilience in" adversity.',cefr:'C1'},
  {w:'accountability',h:'जवाबदेही',sm:'the fact of being responsible for your actions',ipa:'/əˌkaʊntəˈbɪlɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['responsibility','liability'],ant:[],daily:'-',office:'Accountability is non-negotiable.',interview:'I believe in accountability.',business:'Corporate accountability is essential.',formal:'He takes full accountability.',informal:'-',un:'"Accountability for" actions.',cefr:'C1'},
  {w:'transparency',h:'पारदर्शिता',sm:'openness and honesty in actions',ipa:'/trænsˈpærənsi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['openness','clarity'],ant:['opacity','secrecy'],daily:'-',office:'We value transparency.',interview:'-',business:'Transparency builds trust.',formal:'Transparency in governance is vital.',informal:'-',un:'"Transparency in" something.',cefr:'C1'},
  {w:'sustainability',h:'स्थिरता/टिकाऊपन',sm:'the ability to maintain something without depleting resources',ipa:'/səˌsteɪnəˈbɪlɪti/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['durability','longevity'],ant:['unsustainability'],daily:'-',office:'-',interview:'-',business:'Sustainability is our core value.',formal:'Environmental sustainability is crucial.',informal:'-',un:'"Sustainability" in business/environment.',cefr:'B2'},
  {w:'competitive',h:'प्रतिस्पर्धी',sm:'relating to competition; eager to win',ipa:'/kəmˈpɛtɪtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['driven','ambitious'],ant:['cooperative'],daily:'I am competitive in sports.',office:'The market is very competitive.',interview:'I am competitive and results-driven.',business:'Offer competitive pricing.',formal:'He is a competitive professional.',informal:'I get so competitive!',un:'"Competitive" in sports and business.',cefr:'B1'},
  {w:'collaborative',h:'सहयोगात्मक',sm:'done by working together',ipa:'/kəˈlæbərətɪv/',vf:{base:'collaborate',s3:'collaborates',ing:'collaborating',past:'collaborated',pp:'collaborated'},syn:['cooperative','joint'],ant:['individual'],daily:'-',office:'We have a collaborative approach.',interview:'I am collaborative by nature.',business:'Collaborative projects yield better results.',formal:'A collaborative environment is healthy.',informal:'-',un:'"Collaborative approach/work".',cefr:'B2'},
  {w:'versatile',h:'बहुमुखी',sm:'able to adapt to many different functions',ipa:'/ˈvɜːrsətaɪl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['flexible','adaptable'],ant:['specialized','one-dimensional'],daily:'-',office:'She is a versatile employee.',interview:'I am versatile and can handle multiple tasks.',business:'-',formal:'He is a versatile leader.',informal:'She\'s so versatile!',un:'"Versatile" = multiple skills.',cefr:'B2'},
  {w:'meticulous',h:'सूक्ष्मदर्शी',sm:'very careful and precise',ipa:'/mɪˈtɪkjʊləs/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['precise','careful','thorough'],ant:['careless','sloppy'],daily:'-',office:'She is meticulous in her work.',interview:'I am meticulous and detail-oriented.',business:'-',formal:'He is meticulous in documentation.',informal:'-',un:'"Meticulous" = very careful about details.',cefr:'C1'},
  {w:'thorough',h:'संपूर्ण/पूरी तरह',sm:'doing something carefully and completely',ipa:'/ˈθʌrə/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['complete','comprehensive'],ant:['superficial'],daily:'-',office:'Be thorough in your review.',interview:'I am thorough in my work.',business:'A thorough analysis is needed.',formal:'He is thorough and professional.',informal:'-',un:'"Thorough" = leaving nothing out.',cefr:'B2'},
  {w:'attentive',h:'ध्यानी',sm:'paying close attention',ipa:'/əˈtɛntɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['observant','alert'],ant:['inattentive','distracted'],daily:'-',office:'She is attentive to client needs.',interview:'I am an attentive listener.',business:'-',formal:'He is attentive to detail.',informal:'-',un:'"Attentive to" details.',cefr:'B2'},
  {w:'insightful',h:'सूझबूझवाला',sm:'showing accurate understanding',ipa:'/ˈɪnsaɪtfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['perceptive','astute'],ant:['unperceptive'],daily:'-',office:'Her analysis is insightful.',interview:'I am insightful and strategic.',business:'-',formal:'He made an insightful observation.',informal:'-',un:'"Insightful" = gives good insights.',cefr:'C1'},
  {w:'visionary',h:'दूरदर्शी',sm:'thinking about the future with imagination',ipa:'/ˈvɪʒənəri/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['forward-thinking','prophetic'],ant:['short-sighted'],daily:'-',office:'-',interview:'-',business:'He is a visionary leader.',formal:'She is a visionary strategist.',informal:'-',un:'"Visionary" for forward-thinking leaders.',cefr:'C1'},
  {w:'articulate',h:'स्पष्टवादी',sm:'able to speak or express clearly',ipa:'/ɑːrˈtɪkjʊlɪt/',vf:{base:'articulate',s3:'articulates',ing:'articulating',past:'articulated',pp:'articulated'},syn:['eloquent','fluent'],ant:['inarticulate'],daily:'-',office:'She is very articulate.',interview:'I am articulate in my communication.',business:'-',formal:'He is an articulate orator.',informal:'She\'s so articulate!',un:'"Articulate" = speaks very clearly.',cefr:'C1'},
  {w:'coherent',h:'सुसंगत',sm:'logical and consistent',ipa:'/koʊˈhɪərənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['logical','consistent'],ant:['incoherent','confused'],daily:'-',office:'Her argument is coherent.',interview:'-',business:'-',formal:'The plan is coherent and well-structured.',informal:'-',un:'"Coherent" = makes sense together.',cefr:'C1'},
  {w:'compelling',h:'आकर्षक/प्रभावशाली',sm:'evoking interest or admiration in a powerful way',ipa:'/kəmˈpɛlɪŋ/',vf:{base:'compel',s3:'compels',ing:'compelling',past:'compelled',pp:'compelled'},syn:['convincing','persuasive'],ant:['unconvincing'],daily:'-',office:'That is a compelling argument.',interview:'I have a compelling background.',business:'We have a compelling offer.',formal:'He made a compelling case.',informal:'That was so compelling!',un:'"Compelling" = very persuasive.',cefr:'C1'},
  {w:'outstanding',h:'उत्कृष्ट',sm:'exceptionally good',ipa:'/ˌaʊtˈstændɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['excellent','exceptional','remarkable'],ant:['mediocre','average'],daily:'-',office:'Her performance is outstanding.',interview:'My results are outstanding.',business:'Outstanding customer service.',formal:'He was an outstanding candidate.',informal:'That was outstanding!',un:'"Outstanding" = stands out positively.',cefr:'B2'},
  {w:'remarkable',h:'उल्लेखनीय',sm:'worthy of special attention or notice',ipa:'/rɪˈmɑːrkəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['extraordinary','notable'],ant:['ordinary'],daily:'-',office:'That was a remarkable achievement.',interview:'-',business:'-',formal:'He had a remarkable career.',informal:'She\'s remarkable!',un:'"Remarkable" = deserves notice.',cefr:'B2'},
  {w:'distinguished',h:'प्रतिष्ठित',sm:'very successful and respected',ipa:'/dɪˈstɪŋɡwɪʃt/',vf:{base:'distinguish',s3:'distinguishes',ing:'distinguishing',past:'distinguished',pp:'distinguished'},syn:['eminent','renowned'],ant:['unknown'],daily:'-',office:'-',interview:'-',business:'-',formal:'He is a distinguished professor.',informal:'-',un:'"Distinguished" = highly respected, formal.',cefr:'C1'},
  {w:'accomplished',h:'कुशल/सफल',sm:'highly trained or skilled; successful',ipa:'/əˈkɒmplɪʃt/',vf:{base:'accomplish',s3:'accomplishes',ing:'accomplishing',past:'accomplished',pp:'accomplished'},syn:['skilled','expert','proficient'],ant:['unskilled'],daily:'-',office:'She is an accomplished professional.',interview:'I am an accomplished engineer.',business:'-',formal:'He is an accomplished leader.',informal:'She\'s so accomplished!',un:'"Accomplished in/at" something.',cefr:'B2'},
  {w:'decisive',h:'निर्णायक',sm:'able to make decisions quickly and confidently',ipa:'/dɪˈsaɪsɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['definite','conclusive'],ant:['indecisive'],daily:'-',office:'A good manager is decisive.',interview:'I am decisive under pressure.',business:'Decisive leadership matters.',formal:'He is a decisive and efficient leader.',informal:'-',un:'"Decisive" = makes clear decisions.',cefr:'B2'},
  {w:'resilient',h:'दृढ़/लचीला',sm:'able to recover quickly from difficulties',ipa:'/rɪˈzɪliənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['tough','flexible'],ant:['fragile'],daily:'-',office:'-',interview:'I am resilient and bounce back fast.',business:'-',formal:'He is resilient under pressure.',informal:'-',un:'"Resilient" = bounces back.',cefr:'C1'},
  {w:'innovative',h:'अभिनव',sm:'introducing or using new ideas or methods',ipa:'/ˈɪnəveɪtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['creative','groundbreaking'],ant:['traditional','conservative'],daily:'-',office:'We are an innovative company.',interview:'I am innovative and curious.',business:'Our innovative products are market leaders.',formal:'He is an innovative thinker.',informal:'-',un:'"Innovative" in business.',cefr:'B2'},
  {w:'enterprising',h:'उद्यमशील',sm:'showing initiative and willingness to take risks',ipa:'/ˈɛntərˌpraɪzɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['resourceful','ambitious'],ant:['passive'],daily:'-',office:'-',interview:'I am enterprising and proactive.',business:'We need enterprising leaders.',formal:'He is an enterprising young manager.',informal:'-',un:'"Enterprising" = entrepreneurial spirit.',cefr:'C1'},
  {w:'resourceful',h:'साधन-संपन्न',sm:'able to find quick and clever ways to overcome difficulties',ipa:'/rɪˈzɔːrsfəl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['inventive','ingenious'],ant:['helpless'],daily:'-',office:'She is very resourceful.',interview:'I am resourceful in solving problems.',business:'-',formal:'He is a resourceful manager.',informal:'-',un:'"Resourceful" = good at finding solutions.',cefr:'B2'},
  {w:'persuasive',h:'प्रभावशाली/मनाने में कुशल',sm:'good at convincing others to do something',ipa:'/pərˈsweɪsɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['convincing','compelling'],ant:['unconvincing'],daily:'-',office:'She is a persuasive speaker.',interview:'I am persuasive in negotiations.',business:'A persuasive pitch is important.',formal:'He is persuasive and articulate.',informal:'-',un:'"Persuasive" = convinces well.',cefr:'B2'},
  {w:'assertive',h:'दृढ़ता से बोलने वाला',sm:'confident and direct',ipa:'/əˈsɜːrtɪv/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['confident','direct'],ant:['passive','meek'],daily:'-',office:'Be assertive in negotiations.',interview:'I am assertive and clear.',business:'-',formal:'An assertive approach is needed.',informal:'-',un:'"Assertive" not aggressive.',cefr:'C1'},
  {w:'empowered',h:'सशक्त',sm:'made stronger and more confident',ipa:'/ɪmˈpaʊərd/',vf:{base:'empower',s3:'empowers',ing:'empowering',past:'empowered',pp:'empowered'},syn:['enabled','strengthened'],ant:['disempowered'],daily:'I feel empowered.',office:'Our employees are empowered.',interview:'-',business:'We empower our team.',formal:'She was empowered to lead.',informal:'I feel empowered!',un:'"Empowered to" + verb.',cefr:'B2'},
  {w:'acknowledged',h:'स्वीकृत/मान्यता प्राप्त',sm:'recognized as being important or real',ipa:'/ækˈnɒlɪdʒd/',vf:{base:'acknowledge',s3:'acknowledges',ing:'acknowledging',past:'acknowledged',pp:'acknowledged'},syn:['recognized','noted'],ant:['ignored'],daily:'-',office:'His work is acknowledged.',interview:'-',business:'-',formal:'He is an acknowledged expert.',informal:'-',un:'"Acknowledged" = accepted as true/valid.',cefr:'C1'},
  {w:'qualified',h:'योग्य',sm:'having the required credentials or skills',ipa:'/ˈkwɒlɪfaɪd/',vf:{base:'qualify',s3:'qualifies',ing:'qualifying',past:'qualified',pp:'qualified'},syn:['eligible','certified'],ant:['unqualified'],daily:'-',office:'Only qualified staff may apply.',interview:'I am fully qualified for this role.',business:'-',formal:'He is a qualified professional.',informal:'She\'s very qualified for that.',un:'"Qualified for" a role.',cefr:'B1'},
  {w:'well-versed',h:'पारंगत',sm:'highly knowledgeable about a subject',ipa:'/wɛl vɜːrst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['knowledgeable','experienced'],ant:['inexperienced'],daily:'-',office:'-',interview:'I am well-versed in data analysis.',business:'-',formal:'He is well-versed in corporate law.',informal:'-',un:'"Well-versed in" a subject.',cefr:'C1'},
  {w:'goal-oriented',h:'लक्ष्य-केंद्रित',sm:'focused on achieving goals',ipa:'/ɡoʊl ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['target-driven','ambitious'],ant:['aimless'],daily:'-',office:'-',interview:'I am goal-oriented and focused.',business:'-',formal:'He is a goal-oriented leader.',informal:'-',un:'"Goal-oriented" = always working towards targets.',cefr:'B2'},
  {w:'self-motivated',h:'स्वयं प्रेरित',sm:'driven by one\'s own initiative',ipa:'/self ˈmoʊtɪveɪtɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['self-driven','independent'],ant:['passive'],daily:'-',office:'-',interview:'I am a self-motivated person.',business:'-',formal:'He is self-motivated.',informal:'-',un:'"Self-motivated" in interview context.',cefr:'B1'},
  {w:'result-oriented',h:'परिणाम-केंद्रित',sm:'focused on achieving tangible results',ipa:'/rɪˈzʌlt ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['outcome-driven','performance-driven'],ant:['process-focused'],daily:'-',office:'-',interview:'I am result-oriented.',business:'We are result-oriented.',formal:'He is result-oriented and efficient.',informal:'-',un:'"Result-oriented" = focuses on outcomes.',cefr:'B2'},
  {w:'detail-oriented',h:'विवरण-केंद्रित',sm:'paying close attention to small details',ipa:'/ˈdiːteɪl ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['meticulous','precise'],ant:['careless'],daily:'-',office:'Detail-oriented employees produce quality work.',interview:'I am detail-oriented.',business:'-',formal:'He is meticulous and detail-oriented.',informal:'-',un:'"Detail-oriented" = interview strength.',cefr:'B2'},
  {w:'customer-focused',h:'ग्राहक-केंद्रित',sm:'prioritizing customer needs',ipa:'/ˈkʌstəmər ˈfoʊkəst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['client-centric'],ant:[],daily:'-',office:'We are customer-focused.',interview:'I am customer-focused.',business:'A customer-focused approach drives growth.',formal:'He is customer-focused.',informal:'-',un:'"Customer-focused" in business.',cefr:'B2'},
  {w:'quick learner',h:'जल्दी सीखने वाला',sm:'someone who learns new things fast',ipa:'/kwɪk ˈlɜːrnər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['fast learner','adaptable'],ant:['slow learner'],daily:'-',office:'She is a quick learner.',interview:'I am a quick learner.',business:'-',formal:'He is a quick learner.',informal:'She picks things up fast, a quick learner.',un:'"Quick/fast learner" in interview.',cefr:'A2'},
  {w:'self-aware',h:'आत्म-जागरूक',sm:'having knowledge of one\'s own character',ipa:'/sɛlf əˈwɛər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['introspective','conscious'],ant:['unaware'],daily:'-',office:'-',interview:'I am self-aware and continuously improving.',business:'-',formal:'A self-aware leader is more effective.',informal:'-',un:'"Self-aware" = knows own strengths/weaknesses.',cefr:'C1'},
  {w:'growth-oriented',h:'विकास-केंद्रित',sm:'focused on personal or professional growth',ipa:'/ɡroʊθ ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['ambitious','aspiring'],ant:['complacent'],daily:'-',office:'-',interview:'I am growth-oriented.',business:'Our company is growth-oriented.',formal:'-',informal:'-',un:'"Growth-oriented" mindset.',cefr:'B2'},
  {w:'value-driven',h:'मूल्य-आधारित',sm:'guided by strong values',ipa:'/ˈvæljuː ˈdrɪvən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['principled','ethical'],ant:['unprincipled'],daily:'-',office:'-',interview:'I am value-driven.',business:'We are a value-driven organization.',formal:'-',informal:'-',un:'"Value-driven" organization.',cefr:'C1'},
  {w:'data-driven',h:'डेटा-आधारित',sm:'using data to guide decisions',ipa:'/ˈdeɪtə ˈdrɪvən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['analytical','evidence-based'],ant:['intuitive','guess-based'],daily:'-',office:'We make data-driven decisions.',interview:'I am data-driven.',business:'Data-driven insights improve strategy.',formal:'-',informal:'-',un:'"Data-driven" in business/tech.',cefr:'B2'},
  {w:'task-oriented',h:'कार्य-केंद्रित',sm:'focused on completing tasks',ipa:'/tæsk ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['goal-focused','efficient'],ant:['unfocused'],daily:'-',office:'She is task-oriented.',interview:'I am task-oriented.',business:'-',formal:'-',informal:'-',un:'"Task-oriented" = completes what is assigned.',cefr:'B2'},
  {w:'performance-driven',h:'प्रदर्शन-प्रेरित',sm:'motivated by achieving results',ipa:'/pərˈfɔːrməns ˈdrɪvən/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['result-oriented'],ant:['complacent'],daily:'-',office:'We are performance-driven.',interview:'I am performance-driven.',business:'A performance-driven culture yields results.',formal:'-',informal:'-',un:'"Performance-driven" culture.',cefr:'B2'},
  {w:'team-oriented',h:'टीम-केंद्रित',sm:'preferring to work in a team',ipa:'/tiːm ˈɔːriəntɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['collaborative','cooperative'],ant:['individualistic'],daily:'-',office:'She is team-oriented.',interview:'I am team-oriented.',business:'-',formal:'-',informal:'-',un:'"Team-oriented" = works well with others.',cefr:'B1'},
  {w:'self-starter',h:'स्वयं-शुरुआत करने वाला',sm:'someone who begins work without needing to be told',ipa:'/sɛlf ˈstɑːrtər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['self-motivated','proactive'],ant:['passive'],daily:'-',office:'-',interview:'I am a self-starter.',business:'-',formal:'-',informal:'-',un:'"Self-starter" = interview vocabulary.',cefr:'B2'},
  {w:'big-picture thinker',h:'व्यापक दृष्टिकोण वाला',sm:'someone who focuses on overall goals rather than details',ipa:'/bɪɡ ˈpɪktʃər ˈθɪŋkər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['strategic thinker'],ant:['detail-oriented'],daily:'-',office:'-',interview:'I am a big-picture thinker.',business:'-',formal:'-',informal:'-',un:'"Big-picture" thinking in interviews.',cefr:'C1'},
  {w:'solution-focused',h:'समाधान-केंद्रित',sm:'concentrating on finding solutions',ipa:'/səˈluːʃən ˈfoʊkəst/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['problem-solving'],ant:['problem-focused'],daily:'-',office:'-',interview:'I am solution-focused.',business:'We take a solution-focused approach.',formal:'-',informal:'-',un:'"Solution-focused" approach.',cefr:'B2'},
  {w:'emotionally intelligent',h:'भावनात्मक रूप से बुद्धिमान',sm:'having high EQ; understanding emotions',ipa:'/ɪˌmoʊʃənəli ɪnˈtɛlɪdʒənt/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['empathetic','self-aware'],ant:[],daily:'-',office:'-',interview:'I am emotionally intelligent.',business:'-',formal:'He is emotionally intelligent.',informal:'-',un:'"Emotional intelligence" = EQ.',cefr:'C1'},
  {w:'cross-functional',h:'बहु-विभागीय',sm:'working across different departments or teams',ipa:'/krɒs ˈfʌŋkʃənl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['interdepartmental'],ant:['siloed'],daily:'-',office:'We have cross-functional teams.',interview:'I am comfortable with cross-functional work.',business:'Cross-functional collaboration is key.',formal:'-',informal:'-',un:'"Cross-functional" = across departments.',cefr:'C1'},
  {w:'high-performing',h:'उच्च-प्रदर्शन',sm:'achieving excellent results consistently',ipa:'/haɪ pərˈfɔːrmɪŋ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['top-performing','excellent'],ant:['underperforming'],daily:'-',office:'She is part of a high-performing team.',interview:'I am a high-performing individual.',business:'We build high-performing teams.',formal:'-',informal:'-',un:'"High-performing" in business.',cefr:'B2'},
  {w:'well-rounded',h:'सर्वांगीण',sm:'having a variety of skills and experience',ipa:'/wɛl ˈraʊndɪd/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['versatile','all-around'],ant:['specialized only'],daily:'-',office:'-',interview:'I am a well-rounded professional.',business:'-',formal:'-',informal:'She\'s so well-rounded.',un:'"Well-rounded" = diverse skill set.',cefr:'B2'},
  {w:'knowledge',h:'ज्ञान',sm:'information and skills gained through learning',ipa:'/ˈnɒlɪdʒ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['expertise','understanding'],ant:['ignorance'],daily:'Knowledge is power.',office:'Her knowledge is impressive.',interview:'My knowledge of finance is strong.',business:'Industry knowledge is key.',formal:'He has vast knowledge.',informal:'You\'ve got good knowledge.',un:'"Knowledge of/about" something.',cefr:'A2'},
  {w:'understanding',h:'समझ',sm:'the ability to comprehend something',ipa:'/ˌʌndərˈstændɪŋ/',vf:{base:'understand',s3:'understands',ing:'understanding',past:'understood',pp:'understood'},syn:['comprehension','knowledge'],ant:['misunderstanding'],daily:'I have a good understanding.',office:'Understanding client needs is key.',interview:'I have a thorough understanding of the field.',business:'A clear understanding is needed.',formal:'His understanding of the subject is deep.',informal:'Do you have a good understanding?',un:'"Understanding of" something.',cefr:'A2'},
  {w:'expertise',h:'विशेषज्ञता',sm:'expert skill or knowledge in a field',ipa:'/ˌɛkspɜːrˈtiːz/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['skill','mastery'],ant:['inexperience'],daily:'-',office:'Her expertise is valued.',interview:'My expertise is in operations.',business:'We have expertise in logistics.',formal:'He is recognized for his expertise.',informal:'She\'s got real expertise.',un:'"Expertise in" a field.',cefr:'B2'},
  {w:'proficiency',h:'दक्षता',sm:'a high degree of skill or competence',ipa:'/prəˈfɪʃənsi/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['skill','mastery'],ant:['incompetence'],daily:'-',office:'English proficiency is required.',interview:'My proficiency in Excel is high.',business:'-',formal:'He demonstrated high proficiency.',informal:'-',un:'"Proficiency in" a skill.',cefr:'B2'},
  {w:'aspiration',h:'आकांक्षा',sm:'a hope or ambition to achieve something',ipa:'/ˌæspɪˈreɪʃən/',vf:{base:'aspire',s3:'aspires',ing:'aspiring',past:'aspired',pp:'aspired'},syn:['ambition','goal'],ant:['apathy'],daily:'My aspiration is to speak English fluently.',office:'-',interview:'My aspiration is to lead a team.',business:'-',formal:'He has high aspirations.',informal:'What are your aspirations?',un:'"Aspiration to" + verb.',cefr:'B2'},
  {w:'benchmark',h:'मानक',sm:'a standard used for comparison',ipa:'/ˈbɛntʃmɑːrk/',vf:{base:'benchmark',s3:'benchmarks',ing:'benchmarking',past:'benchmarked',pp:'benchmarked'},syn:['standard','reference point'],ant:[],daily:'-',office:'This is our benchmark.',interview:'-',business:'We set benchmarks for quality.',formal:'The benchmark for excellence is high.',informal:'-',un:'"Benchmark for" something.',cefr:'B2'},
  {w:'threshold',h:'सीमा/दहलीज़',sm:'the level or point at which something starts',ipa:'/ˈθrɛʃhoʊld/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['limit','boundary'],ant:[],daily:'-',office:'-',interview:'-',business:'We have crossed the profitability threshold.',formal:'The threshold for action is met.',informal:'-',un:'"Threshold for" something.',cefr:'C1'},
  {w:'outcome',h:'परिणाम',sm:'the result of an action or event',ipa:'/ˈaʊtkʌm/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['result','consequence'],ant:[],daily:'-',office:'The outcome is positive.',interview:'I focus on outcomes.',business:'Business outcomes are measurable.',formal:'The outcome was satisfactory.',informal:'What was the outcome?',un:'"Outcome of" something.',cefr:'B2'},
  {w:'deliverable',h:'परिणामयोग्य कार्य',sm:'a result that can be measured and handed over',ipa:'/dɪˈlɪvərəbl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['output','result'],ant:[],daily:'-',office:'List your deliverables.',interview:'-',business:'We met all deliverables.',formal:'Deliverables are on schedule.',informal:'-',un:'"Deliverables" plural is common.',cefr:'C1'},
  {w:'stakeholder',h:'हितधारक',sm:'a person with an interest in a project or company',ipa:'/ˈsteɪkhoʊldər/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['investor','participant'],ant:[],daily:'-',office:'Keep all stakeholders informed.',interview:'-',business:'Stakeholder management is key.',formal:'All stakeholders are represented.',informal:'-',un:'"Stakeholder" = anyone affected by a project.',cefr:'C1'},
  {w:'workflow',h:'कार्यप्रवाह',sm:'the sequence of steps in a process',ipa:'/ˈwɜːrkfloʊ/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['process','pipeline'],ant:[],daily:'-',office:'The workflow needs improvement.',interview:'-',business:'Streamline your workflow.',formal:'The workflow is clearly defined.',informal:'-',un:'"Workflow" in project management.',cefr:'C1'},
  {w:'protocol',h:'प्रोटोकॉल',sm:'a set of rules governing behavior in a situation',ipa:'/ˈproʊtəkɒl/',vf:{base:'-',s3:'-',ing:'-',past:'-',pp:'-'},syn:['procedure','standard'],ant:[],daily:'-',office:'Follow the office protocol.',interview:'-',business:'Business protocols vary by culture.',formal:'The protocol was strictly followed.',informal:'-',un:'"Protocol for" a situation.',cefr:'C1'},
];

const allVocabData = [...vocabData, ...extraVocabData];
const vocabItems = buildVocab(allVocabData.slice(0, 950));

const vocabOut = {
  day: 4,
  title: "Be Verb — Vocabulary",
  totalWords: vocabItems.length,
  words: vocabItems
};

fs.writeFileSync(path.join(BASE,'vocabulary.json'), JSON.stringify(vocabOut, null, 2));
console.log('vocabulary.json written:', vocabItems.length);

// ============================================================
// DAILY TEST - target 350 questions
// ============================================================

// Types: translate, fill, error, mcq
// translate: hindi, options (3 distractors + correct string), answer, explanation
// fill: sentence, options (4), answer, explanation
// error: sentence, options [wrong, correct], answer, explanation
// mcq: question, options [4 strings], answer, explanation

const dtQuestions = [];
let dtId = 1;

function addTranslate(h, e, distractors, exp) {
  const opts = [...distractors, e];
  dtQuestions.push({
    id: dtId++, type: 'translate', hindi: h,
    options: opts, answer: e,
    explanation: exp || `Correct translation: "${h}" = "${e}"`
  });
}

function addFill(sentence, blank, distractors, exp) {
  const opts = [...distractors, blank];
  dtQuestions.push({
    id: dtId++, type: 'fill', sentence,
    options: opts, answer: blank,
    explanation: exp || `The missing word is "${blank}" — full sentence: "${sentence.replace('_____', blank)}"`
  });
}

function addError(wrong, correct, exp) {
  dtQuestions.push({
    id: dtId++, type: 'error', sentence: wrong,
    options: [wrong, correct], answer: correct,
    explanation: exp || `Correct sentence: "${correct}". The version shown had a grammar mistake.`
  });
}

function addMCQ(question, opts, answer, exp) {
  dtQuestions.push({
    id: dtId++, type: 'mcq', question,
    options: opts, answer,
    explanation: exp
  });
}

// === TRANSLATE ===
const translateData = [
  // I am
  {h:'मैं एक छात्र हूँ।',e:'I am a student.',d:[{english:'I am 25 years old.',hindi:'मैं 25 साल का हूँ।'},{english:'I am a doctor.',hindi:'मैं एक doctor हूँ।'},{english:'I am proud.',hindi:'मैं proud हूँ।'}]},
  {h:'मैं तैयार हूँ।',e:'I am ready.',d:[{english:'I am hungry.',hindi:'मैं भूखा हूँ।'},{english:'I am busy.',hindi:'मैं busy हूँ।'},{english:'I am a good friend.',hindi:'मैं एक अच्छा दोस्त हूँ।'}]},
  {h:'मैं घर पर हूँ।',e:'I am at home.',d:[{english:'I am sick.',hindi:'मैं बीमार हूँ।'},{english:'I am excited.',hindi:'मैं excited हूँ।'},{english:'I am on the train.',hindi:'मैं train में हूँ।'}]},
  {h:'मैं गलत हूँ।',e:'I am wrong.',d:[{english:'I am late.',hindi:'मैं late हूँ।'},{english:'I am Indian.',hindi:'मैं Indian हूँ।'},{english:'He is a teacher.',hindi:'वह एक शिक्षक है।'}]},
  {h:'मैं ठीक हूँ।',e:'I am fine.',d:[{english:'I am nervous.',hindi:'मैं nervous हूँ।'},{english:'I am in a meeting.',hindi:'मैं meeting में हूँ।'},{english:'Rahul is a student.',hindi:'राहुल एक छात्र है।'}]},
  {h:'मैं यहाँ हूँ।',e:'I am here.',d:[{english:'I am confident.',hindi:'मैं confident हूँ।'},{english:'I am married.',hindi:'मैं शादीशुदा हूँ।'},{english:'The book is on the table.',hindi:'किताब मेज़ पर है।'}]},
  {h:'मैं गर्वित हूँ।',e:'I am proud.',d:[{english:'I am not happy.',hindi:'मैं happy नहीं हूँ।'},{english:'My mother is at home.',hindi:'मेरी माँ घर पर है।'},{english:'The weather is cold.',hindi:'मौसम ठंडा है।'}]},
  {h:'मैं आत्मविश्वासी हूँ।',e:'I am confident.',d:[{english:'I am in the office.',hindi:'मैं office में हूँ।'},{english:'It is a cat.',hindi:'यह एक बिल्ली है।'},{english:'The sky is blue.',hindi:'आसमान नीला है।'}]},
  {h:'मैं एक अच्छा दोस्त हूँ।',e:'I am a good friend.',d:[{english:'She is a doctor.',hindi:'वह एक डॉक्टर है।'},{english:'My house is big.',hindi:'मेरा घर बड़ा है।'},{english:'This is my car.',hindi:'यह मेरी कार है।'}]},
  {h:'मैं ट्रेन में हूँ।',e:'I am on the train.',d:[{english:'My brother is smart.',hindi:'मेरा भाई smart है।'},{english:'She is beautiful.',hindi:'वह खूबसूरत है।'},{english:'The water is hot.',hindi:'पानी गर्म है।'}]},
  // He/She is
  {h:'वह एक डॉक्टर है।',e:'He is a doctor.',d:[{english:'She is a nurse.',hindi:'वह एक नर्स है।'},{english:'They are engineers.',hindi:'वे इंजीनियर हैं।'},{english:'I am a pilot.',hindi:'मैं एक पायलट हूँ।'}]},
  {h:'वह खुश है।',e:'She is happy.',d:[{english:'He is sad.',hindi:'वह उदास है।'},{english:'They are tired.',hindi:'वे थके हुए हैं।'},{english:'I am nervous.',hindi:'मैं घबराया हुआ हूँ।'}]},
  {h:'वह स्कूल में है।',e:'He is at school.',d:[{english:'She is at home.',hindi:'वह घर पर है।'},{english:'We are at the office.',hindi:'हम ऑफिस में हैं।'},{english:'They are at the market.',hindi:'वे बाज़ार में हैं।'}]},
  {h:'वह बहुत लंबी है।',e:'She is very tall.',d:[{english:'He is short.',hindi:'वह नाटा है।'},{english:'They are strong.',hindi:'वे मज़बूत हैं।'},{english:'I am brave.',hindi:'मैं बहादुर हूँ।'}]},
  {h:'वह एक मैनेजर है।',e:'He is a manager.',d:[{english:'She is an accountant.',hindi:'वह एक accountant है।'},{english:'I am an analyst.',hindi:'मैं एक analyst हूँ।'},{english:'We are consultants.',hindi:'हम consultants हैं।'}]},
  {h:'वह घबरायी हुई है।',e:'She is nervous.',d:[{english:'He is excited.',hindi:'वह उत्साहित है।'},{english:'They are calm.',hindi:'वे शांत हैं।'},{english:'I am confident.',hindi:'मैं आत्मविश्वासी हूँ।'}]},
  {h:'वह अनुपस्थित है।',e:'He is absent.',d:[{english:'She is present.',hindi:'वह उपस्थित है।'},{english:'I am late.',hindi:'मैं देर से हूँ।'},{english:'We are ready.',hindi:'हम तैयार हैं।'}]},
  {h:'वह हमारी टीम लीडर है।',e:'She is our team leader.',d:[{english:'He is our manager.',hindi:'वह हमारा manager है।'},{english:'I am the new employee.',hindi:'मैं नया कर्मचारी हूँ।'},{english:'They are our clients.',hindi:'वे हमारे clients हैं।'}]},
  // It is / This is / That is
  {h:'यह एक किताब है।',e:'It is a book.',d:[{english:'This is a pen.',hindi:'यह एक कलम है।'},{english:'That is a car.',hindi:'वह एक कार है।'},{english:'These are bags.',hindi:'ये बैग हैं।'}]},
  {h:'यह बहुत महँगा है।',e:'It is very expensive.',d:[{english:'It is very cheap.',hindi:'यह बहुत सस्ता है।'},{english:'It is new.',hindi:'यह नया है।'},{english:'It is big.',hindi:'यह बड़ा है।'}]},
  {h:'यह मेरी किताब है।',e:'This is my book.',d:[{english:'That is his car.',hindi:'वह उसकी कार है।'},{english:'These are my friends.',hindi:'ये मेरे दोस्त हैं।'},{english:'Those are their bags.',hindi:'वे उनके बैग हैं।'}]},
  {h:'आज मौसम ठंडा है।',e:'It is cold today.',d:[{english:'It is hot today.',hindi:'आज गर्म है।'},{english:'It is raining.',hindi:'बारिश हो रही है।'},{english:'The sky is clear.',hindi:'आसमान साफ़ है।'}]},
  {h:'खाना स्वादिष्ट है।',e:'The food is delicious.',d:[{english:'The food is terrible.',hindi:'खाना भयानक है।'},{english:'The tea is cold.',hindi:'चाय ठंडी है।'},{english:'The room is dirty.',hindi:'कमरा गंदा है।'}]},
  // We are / They are
  {h:'हम तैयार हैं।',e:'We are ready.',d:[{english:'They are tired.',hindi:'वे थके हुए हैं।'},{english:'You are right.',hindi:'तुम सही हो।'},{english:'I am busy.',hindi:'मैं व्यस्त हूँ।'}]},
  {h:'वे इंजीनियर हैं।',e:'They are engineers.',d:[{english:'We are doctors.',hindi:'हम डॉक्टर हैं।'},{english:'You are students.',hindi:'तुम छात्र हो।'},{english:'He is a pilot.',hindi:'वह एक पायलट है।'}]},
  {h:'हम एक टीम हैं।',e:'We are a team.',d:[{english:'They are colleagues.',hindi:'वे सहकर्मी हैं।'},{english:'I am a leader.',hindi:'मैं एक नेता हूँ।'},{english:'She is a manager.',hindi:'वह एक manager है।'}]},
  {h:'वे हमारे ग्राहक हैं।',e:'They are our clients.',d:[{english:'We are your clients.',hindi:'हम आपके clients हैं।'},{english:'She is our consultant.',hindi:'वह हमारी consultant है।'},{english:'He is our partner.',hindi:'वह हमारा partner है।'}]},
  // Was / Were - past
  {h:'मैं कल बीमार था।',e:'I was sick yesterday.',d:[{english:'I was tired last week.',hindi:'मैं पिछले हफ़्ते थका हुआ था।'},{english:'He was absent yesterday.',hindi:'वह कल अनुपस्थित था।'},{english:'She was at school.',hindi:'वह स्कूल में थी।'}]},
  {h:'वह पहले एक शिक्षक था।',e:'He was a teacher before.',d:[{english:'She was a student before.',hindi:'वह पहले छात्रा थी।'},{english:'They were engineers.',hindi:'वे इंजीनियर थे।'},{english:'I was a pilot.',hindi:'मैं एक पायलट था।'}]},
  {h:'हम बचपन में दोस्त थे।',e:'We were friends in childhood.',d:[{english:'They were classmates.',hindi:'वे सहपाठी थे।'},{english:'I was alone.',hindi:'मैं अकेला था।'},{english:'She was busy.',hindi:'वह व्यस्त थी।'}]},
  {h:'वे कल बहुत व्यस्त थे।',e:'They were very busy yesterday.',d:[{english:'We were very happy.',hindi:'हम बहुत खुश थे।'},{english:'He was very tired.',hindi:'वह बहुत थका था।'},{english:'She was very excited.',hindi:'वह बहुत उत्साहित थी।'}]},
  {h:'परीक्षा कठिन थी।',e:'The exam was difficult.',d:[{english:'The lesson was easy.',hindi:'पाठ आसान था।'},{english:'The meeting was long.',hindi:'बैठक लंबी थी।'},{english:'The film was boring.',hindi:'फ़िल्म उबाऊ थी।'}]},
  // Negative
  {h:'मैं तैयार नहीं हूँ।',e:'I am not ready.',d:[{english:'I am not happy.',hindi:'मैं खुश नहीं हूँ।'},{english:'I am not busy.',hindi:'मैं व्यस्त नहीं हूँ।'},{english:'I am not a student.',hindi:'मैं छात्र नहीं हूँ।'}]},
  {h:'वह यहाँ नहीं है।',e:'He is not here.',d:[{english:'She is not ready.',hindi:'वह तैयार नहीं है।'},{english:'It is not correct.',hindi:'यह सही नहीं है।'},{english:'I am not tired.',hindi:'मैं थका नहीं हूँ।'}]},
  {h:'हम तैयार नहीं हैं।',e:'We are not ready.',d:[{english:'They are not here.',hindi:'वे यहाँ नहीं हैं।'},{english:'I am not wrong.',hindi:'मैं गलत नहीं हूँ।'},{english:'She is not busy.',hindi:'वह व्यस्त नहीं है।'}]},
  // Question forms
  {h:'क्या तुम तैयार हो?',e:'Are you ready?',d:[{english:'Is he ready?',hindi:'क्या वह तैयार है?'},{english:'Am I right?',hindi:'क्या मैं सही हूँ?'},{english:'Were they here?',hindi:'क्या वे यहाँ थे?'}]},
  {h:'क्या वह डॉक्टर है?',e:'Is she a doctor?',d:[{english:'Is he a teacher?',hindi:'क्या वह शिक्षक है?'},{english:'Are you a student?',hindi:'क्या तुम छात्र हो?'},{english:'Was he a pilot?',hindi:'क्या वह पायलट था?'}]},
  {h:'क्या वे खुश थे?',e:'Were they happy?',d:[{english:'Was she present?',hindi:'क्या वह उपस्थित थी?'},{english:'Were we right?',hindi:'क्या हम सही थे?'},{english:'Was it expensive?',hindi:'क्या यह महँगा था?'}]},
  // Additional varied
  {h:'मेरा नाम राहुल है।',e:'My name is Rahul.',d:[{english:'His name is Rohit.',hindi:'उसका नाम रोहित है।'},{english:'Her name is Priya.',hindi:'उसका नाम प्रिया है।'},{english:'My name is Anita.',hindi:'मेरा नाम अनीता है।'}]},
  {h:'आसमान नीला है।',e:'The sky is blue.',d:[{english:'The grass is green.',hindi:'घास हरी है।'},{english:'The water is cold.',hindi:'पानी ठंडा है।'},{english:'The sun is hot.',hindi:'सूरज गर्म है।'}]},
  {h:'मेरे पिता ऑफिस में हैं।',e:'My father is at the office.',d:[{english:'My mother is at home.',hindi:'मेरी माँ घर पर है।'},{english:'My sister is at school.',hindi:'मेरी बहन स्कूल में है।'},{english:'My brother is at the hospital.',hindi:'मेरा भाई अस्पताल में है।'}]},
  {h:'बैंक बंद है।',e:'The bank is closed.',d:[{english:'The school is open.',hindi:'स्कूल खुला है।'},{english:'The market is busy.',hindi:'बाज़ार व्यस्त है।'},{english:'The library is empty.',hindi:'पुस्तकालय खाली है।'}]},
  {h:'इंटरनेट धीमा है।',e:'The internet is slow.',d:[{english:'The bus is fast.',hindi:'बस तेज़ है।'},{english:'The computer is new.',hindi:'कंप्यूटर नया है।'},{english:'The phone is expensive.',hindi:'फ़ोन महँगा है।'}]},
  {h:'वह एक समर्पित कर्मचारी है।',e:'He is a dedicated employee.',d:[{english:'She is a hardworking student.',hindi:'वह एक परिश्रमी छात्रा है।'},{english:'I am a responsible person.',hindi:'मैं एक जिम्मेदार व्यक्ति हूँ।'},{english:'They are qualified engineers.',hindi:'वे योग्य इंजीनियर हैं।'}]},
  {h:'मैं इस पद के लिए उपयुक्त हूँ।',e:'I am suitable for this position.',d:[{english:'She is qualified for the job.',hindi:'वह नौकरी के लिए योग्य है।'},{english:'We are ready for the challenge.',hindi:'हम चुनौती के लिए तैयार हैं।'},{english:'He is experienced in sales.',hindi:'वह बिक्री में अनुभवी है।'}]},
  {h:'वह एक प्रसिद्ध वैज्ञानिक है।',e:'She is a famous scientist.',d:[{english:'He is a renowned doctor.',hindi:'वह एक प्रसिद्ध डॉक्टर है।'},{english:'I am a well-known journalist.',hindi:'मैं एक प्रसिद्ध पत्रकार हूँ।'},{english:'They are popular musicians.',hindi:'वे लोकप्रिय संगीतकार हैं।'}]},
  {h:'कहानी दिलचस्प थी।',e:'The story was interesting.',d:[{english:'The film was boring.',hindi:'फ़िल्म उबाऊ थी।'},{english:'The lesson was difficult.',hindi:'पाठ कठिन था।'},{english:'The exam was easy.',hindi:'परीक्षा आसान थी।'}]},
];

for (const t of translateData) {
  addTranslate(t.h, t.e, t.d);
}

// === FILL ===
const fillData = [
  {s:'I _____ happy.',b:'am',d:['is','are','were']},
  {s:'I am _____ engineer.',b:'an',d:['a','the','serious']},
  {s:'I _____ hungry.',b:'am',d:['is','are','was']},
  {s:'I am _____ years old.',b:'25',d:['doctor','happy','proud']},
  {s:'I _____ sick.',b:'am',d:['is','are','were']},
  {s:'I _____ late.',b:'am',d:['is','are','was']},
  {s:'I _____ confident.',b:'am',d:['is','are','were']},
  {s:'I _____ nervous.',b:'am',d:['is','are','was']},
  {s:'I am _____ happy.',b:'not',d:['very','at','cold']},
  {s:'I am _____ the office.',b:'in',d:['on','at','to']},
  {s:'He _____ a teacher.',b:'is',d:['am','are','were']},
  {s:'She _____ beautiful.',b:'is',d:['am','are','were']},
  {s:'He _____ absent today.',b:'is',d:['am','are','was']},
  {s:'She _____ nervous.',b:'is',d:['am','are','were']},
  {s:'It _____ cold today.',b:'is',d:['am','are','was']},
  {s:'The food _____ delicious.',b:'is',d:['am','are','were']},
  {s:'The bank _____ closed.',b:'is',d:['am','are','was']},
  {s:'My name _____ Rahul.',b:'is',d:['am','are','was']},
  {s:'The exam _____ difficult.',b:'is',d:['am','are','were']},
  {s:'He _____ not here.',b:'is',d:['am','are','was']},
  {s:'You _____ right.',b:'are',d:['am','is','was']},
  {s:'You _____ late.',b:'are',d:['am','is','were']},
  {s:'You _____ a good student.',b:'are',d:['am','is','was']},
  {s:'We _____ friends.',b:'are',d:['am','is','was']},
  {s:'We _____ ready.',b:'are',d:['am','is','were']},
  {s:'They _____ students.',b:'are',d:['am','is','was']},
  {s:'They _____ in Delhi.',b:'are',d:['am','is','were']},
  {s:'They _____ our clients.',b:'are',d:['am','is','was']},
  {s:'We _____ a team.',b:'are',d:['am','is','was']},
  {s:'All students _____ present.',b:'are',d:['am','is','was']},
  {s:'I _____ sick yesterday.',b:'was',d:['am','is','are']},
  {s:'He _____ absent on Monday.',b:'was',d:['am','is','are']},
  {s:'She _____ a teacher before.',b:'was',d:['am','is','are']},
  {s:'It _____ very hot last week.',b:'was',d:['am','is','are']},
  {s:'The meeting _____ long yesterday.',b:'was',d:['am','is','are']},
  {s:'The exam _____ difficult.',b:'was',d:['am','is','are']},
  {s:'He _____ not there.',b:'was',d:['am','is','are']},
  {s:'We _____ in Delhi last week.',b:'were',d:['am','is','are']},
  {s:'They _____ tired yesterday.',b:'were',d:['am','is','are']},
  {s:'We _____ friends in college.',b:'were',d:['am','is','are']},
  {s:'They _____ not happy.',b:'were',d:['am','is','are']},
  {s:'I\'m is short for I _____.',b:'am',d:['is','are','was']},
  {s:'He\'s means he _____.',b:'is',d:['am','are','was']},
  {s:'They\'re means they _____.',b:'are',d:['am','is','was']},
  {s:'Isn\'t means is _____.',b:'not',d:['very','also','here']},
  {s:'She is _____ dedicated employee.',b:'a',d:['an','the','very']},
  {s:'He is _____ honest person.',b:'an',d:['a','the','very']},
  {s:'They are _____ engineers.',b:'experienced',d:['a','is','am']},
  {s:'I am _____ to learn English.',b:'eager',d:['is','are','was']},
  {s:'She _____ a qualified doctor.',b:'is',d:['am','are','were']},
  {s:'We are _____ to our clients.',b:'committed',d:['is','a','was']},
  {s:'The project is _____ important.',b:'very',d:['is','am','are']},
  {s:'I am _____ about my goals.',b:'focused',d:['is','a','were']},
  {s:'He was _____ in 2019.',b:'promoted',d:['am','is','are']},
  {s:'She is very _____ in her work.',b:'meticulous',d:['is','am','are']},
  {s:'I am _____ and result-oriented.',b:'dedicated',d:['is','are','was']},
  {s:'The internet _____ very slow.',b:'is',d:['am','are','were']},
  {s:'She was _____ for the meeting.',b:'late',d:['am','is','are']},
  {s:'He is _____ in his field.',b:'an expert',d:['a expert','is expert','experts']},
  {s:'They _____ very successful last year.',b:'were',d:['am','is','are']},
  {s:'I am _____ from Mumbai.',b:'from',d:['in','at','on']},
  {s:'She _____ happy about the news.',b:'is',d:['am','are','were']},
  {s:'We _____ not ready yet.',b:'are',d:['am','is','was']},
  {s:'He is _____ of this company.',b:'proud',d:['am','are','were']},
  {s:'I am _____ at time management.',b:'good',d:['is','are','was']},
  {s:'She is _____ versatile professional.',b:'a',d:['an','is','am']},
  {s:'He _____ a famous scientist before.',b:'was',d:['am','is','are']},
  {s:'We are _____ for the challenge.',b:'ready',d:['is','am','were']},
  {s:'I _____ an intern last year.',b:'was',d:['am','is','are']},
  {s:'The project _____ completed yesterday.',b:'was',d:['am','is','are']},
  {s:'They _____ engineers at that company.',b:'are',d:['am','is','was']},
];

for (const f of fillData) {
  addFill(f.s, f.b, f.d, null);
}

// === ERROR ===
const errorData = [
  ['I is from Delhi.','I am from Delhi.'],
  ['I is tired.','I am tired.'],
  ['I is right.','I am right.'],
  ['I is thirsty.','I am thirsty.'],
  ['I is a doctor.','I am a doctor.'],
  ['I is busy.','I am busy.'],
  ['I is in a meeting.','I am in a meeting.'],
  ['I is excited.','I am excited.'],
  ['I is Indian.','I am Indian.'],
  ['I is married.','I am married.'],
  ['I is nervous.','I am nervous.'],
  ['I is late.','I am late.'],
  ['I is a manager.','I am a manager.'],
  ['I is proud.','I am proud.'],
  ['I is here.','I am here.'],
  ['He am a teacher.','He is a teacher.'],
  ['He am from Mumbai.','He is from Mumbai.'],
  ['She am beautiful.','She is beautiful.'],
  ['She am happy.','She is happy.'],
  ['He am absent today.','He is absent today.'],
  ['She am a nurse.','She is a nurse.'],
  ['He am my manager.','He is my manager.'],
  ['It am cold.','It is cold.'],
  ['It am a book.','It is a book.'],
  ['It am expensive.','It is expensive.'],
  ['The food am delicious.','The food is delicious.'],
  ['The bank am closed.','The bank is closed.'],
  ['My name am Rahul.','My name is Rahul.'],
  ['The exam am difficult.','The exam is difficult.'],
  ['The project am important.','The project is important.'],
  ['You is right.','You are right.'],
  ['You is a student.','You are a student.'],
  ['We is friends.','We are friends.'],
  ['We is ready.','We are ready.'],
  ['They is students.','They are students.'],
  ['They is in Delhi.','They are in Delhi.'],
  ['They is our clients.','They are our clients.'],
  ['I were sick yesterday.','I was sick yesterday.'],
  ['He were absent yesterday.','He was absent yesterday.'],
  ['She were a teacher before.','She was a teacher before.'],
  ['They was tired yesterday.','They were tired yesterday.'],
  ['We was in Delhi last year.','We were in Delhi last year.'],
  ['He are a dedicated employee.','He is a dedicated employee.'],
  ['She are very smart.','She is very smart.'],
  ['I are ready for the interview.','I am ready for the interview.'],
  ['The meeting were yesterday.','The meeting was yesterday.'],
  ['They was happy before.','They were happy before.'],
  ['I is not happy.','I am not happy.'],
  ['He are not here.','He is not here.'],
  ['We is not ready.','We are not ready.'],
  ['Is you a doctor?','Are you a doctor?'],
  ['Am they ready?','Are they ready?'],
  ['Are I right?','Am I right?'],
  ['She is a very experience engineer.','She is a very experienced engineer.'],
  ['He is a honest person.','He is an honest person.'],
  ['I am a engineer.','I am an engineer.'],
  ['She am an accountant.','She is an accountant.'],
  ['They was very busy last week.','They were very busy last week.'],
  ['He were a soldier.','He was a soldier.'],
  ['I were young at that time.','I was young at that time.'],
];

for (const e of errorData) {
  addError(e[0], e[1]);
}

// === MCQ ===
const mcqData = [
  {q:'Which is the correct form of be verb to use with "I"?',opts:['is','are','am','was/were'],a:'am',exp:'"I" always uses "am" in the present tense.'},
  {q:'Which form of be verb do we use with "He/She/It"?',opts:['am','are','is','were'],a:'is',exp:'"He/She/It" uses "is" in present tense.'},
  {q:'Which form of be verb do we use with "We/You/They"?',opts:['am','is','was','are'],a:'are',exp:'"We/You/They" use "are" in present tense.'},
  {q:'What is the past tense of "am/is"?',opts:['were','are','been','being'],a:'was',exp:'"am/is" becomes "was" in past tense (I was, he was, she was, it was).'},
  {q:'What is the past tense of "are"?',opts:['was','am','is','been'],a:'were',exp:'"are" becomes "were" in past tense (we were, they were, you were).'},
  {q:'Choose the correct sentence.',opts:['I is happy.','I are happy.','I am happy.','I was happy.'],a:'I am happy.',exp:'"I" uses "am" in present tense.'},
  {q:'Choose the correct sentence.',opts:['She are a doctor.','She am a doctor.','She were a doctor.','She is a doctor.'],a:'She is a doctor.',exp:'"She" uses "is" in present tense.'},
  {q:'Choose the correct sentence.',opts:['They is students.','They am students.','They are students.','They was students.'],a:'They are students.',exp:'"They" uses "are" in present tense.'},
  {q:'Choose the correct sentence.',opts:['He were absent yesterday.','He was absent yesterday.','He is absent yesterday.','He are absent yesterday.'],a:'He was absent yesterday.',exp:'"He" uses "was" for past tense.'},
  {q:'Choose the correct sentence.',opts:['We was tired last week.','We am tired last week.','We were tired last week.','We is tired last week.'],a:'We were tired last week.',exp:'"We" uses "were" for past tense.'},
  {q:'What is the negative of "I am happy"?',opts:['I am no happy.','I not am happy.','I am not happy.','I not happy.'],a:'I am not happy.',exp:'Add "not" after "am" to make it negative.'},
  {q:'What is the negative of "He is here"?',opts:['He not is here.','He is not here.','He isn\'t not here.','He no is here.'],a:'He is not here.',exp:'Add "not" after "is" to make it negative.'},
  {q:'"I\'m" is a contraction of which two words?',opts:['I is','I are','I am','I was'],a:'I am',exp:'"I\'m" = I am (contracted with apostrophe).'},
  {q:'"They\'re" is a contraction of which two words?',opts:['They is','They am','They was','They are'],a:'They are',exp:'"They\'re" = They are.'},
  {q:'"Wasn\'t" is the negative contraction of which word?',opts:['were','is','am','was'],a:'was',exp:'"Wasn\'t" = was not.'},
  {q:'Which sentence is grammatically correct?',opts:['He are a manager.','He is a manager.','He am a manager.','He were a manager.'],a:'He is a manager.',exp:'"He" (third person singular) uses "is".'},
  {q:'Which sentence is in past tense?',opts:['I am a student.','She is a teacher.','They were engineers.','We are friends.'],a:'They were engineers.',exp:'"Were" is past tense of "are".'},
  {q:'Which word fills the blank? "She _____ a pilot."',opts:['am','are','were','is'],a:'is',exp:'"She" uses "is" in present tense.'},
  {q:'Which word fills the blank? "We _____ very busy yesterday."',opts:['am','is','are','were'],a:'were',exp:'"We" uses "were" in past tense.'},
  {q:'What does "He isn\'t here" mean?',opts:['He is not here.','He was not here.','He will not be here.','He is here.'],a:'He is not here.',exp:'"Isn\'t" = is not; present tense negative.'},
  {q:'Which subject uses "was"?',opts:['They','We','I','You'],a:'I',exp:'"Was" is used with I/He/She/It in past tense.'},
  {q:'Which subject uses "were"?',opts:['He','She','It','They'],a:'They',exp:'"Were" is used with We/You/They in past tense.'},
  {q:'What type of sentence is "Am I right?"',opts:['Affirmative','Negative','Interrogative','Exclamatory'],a:'Interrogative',exp:'Questions are called interrogative sentences. Subject and be verb are inverted.'},
  {q:'"I am a doctor" — which type of use is this?',opts:['Location','Emotion','Identity/Occupation','Time'],a:'Identity/Occupation',exp:'Be verb is used here to state an occupation (identity).'},
  {q:'"He is in Delhi" — which type of use is this?',opts:['Emotion','Identity','Description','Location'],a:'Location',exp:'Be verb is used here to state where someone is (location).'},
  {q:'"She is beautiful" — which type of use is this?',opts:['Location','Identity','Description','Past'],a:'Description',exp:'Be verb is used here to describe someone (description).'},
  {q:'"I am tired" — which type of use is this?',opts:['Location','Identity','State/Condition','Description'],a:'State/Condition',exp:'Be verb is used to express a physical or emotional state.'},
  {q:'Which is the correct question form of "He is a teacher"?',opts:['He is a teacher?','Does he is a teacher?','Is he a teacher?','Is a teacher he?'],a:'Is he a teacher?',exp:'To make a question, place the be verb before the subject: Is + he + a teacher?'},
  {q:'Which is the correct question form of "They are ready"?',opts:['Do they are ready?','They are ready?','Are they ready?','Are ready they?'],a:'Are they ready?',exp:'Invert: Are + they + ready?'},
  {q:'Which sentence is NOT correct?',opts:['I am from Delhi.','She is a nurse.','They are busy.','We is ready.'],a:'We is ready.',exp:'"We" requires "are", not "is".'},
  {q:'Which sentence is correct?',opts:['I am a engineer.','I am an engineer.','I is an engineer.','I are an engineer.'],a:'I am an engineer.',exp:'"I" + "am"; "an" before vowel sound (e-ngineer).'},
  {q:'Choose the right negative of "We are ready".',opts:['We not are ready.','We are ready not.','We are not ready.','We aren\'t not ready.'],a:'We are not ready.',exp:'"Not" goes after "are".'},
  {q:'What is the full form of "isn\'t"?',opts:['I is not','is not','it is not','I am not'],a:'is not',exp:'"Isn\'t" = is + not.'},
  {q:'Which word best completes: "I am _____ in English."',opts:['fluent','fluently','fluid','fluence'],a:'fluent',exp:'"Fluent" is the adjective; "fluently" is the adverb.'},
  {q:'Which sentence uses "be verb" to show location?',opts:['He is smart.','I am happy.','She is at school.','They are students.'],a:'She is at school.',exp:'"At school" shows location; be verb + location.'},
  {q:'Which sentence is in present tense?',opts:['I was tired.','She was absent.','He is a manager.','We were happy.'],a:'He is a manager.',exp:'"Is" is present tense.'},
  {q:'What is the correct tag question for "She is a doctor"?',opts:['isn\'t she?','aren\'t she?','wasn\'t she?','doesn\'t she?'],a:'isn\'t she?',exp:'Tag question for "is" = "isn\'t".'},
  {q:'Which sentence shows "be verb" for a state/feeling?',opts:['She is a teacher.','He is in Delhi.','I am nervous.','This is a book.'],a:'I am nervous.',exp:'"Nervous" is a feeling/state, expressed with be verb.'},
  {q:'How do you say "वह बीमार नहीं है" in English?',opts:['He not sick.','He is not sick.','He isn\'t sick.','Both b and c'],a:'Both b and c',exp:'"He is not sick" and "He isn\'t sick" are both correct.'},
  {q:'Which is the correct use of "were"?',opts:['I were happy.','He were absent.','She were tired.','They were busy.'],a:'They were busy.',exp:'"Were" is used with They/We/You in past tense.'},
  {q:'Which word fills: "The project _____ completed last week."',opts:['am','is','are','was'],a:'was',exp:'"The project" is singular, and this is past tense, so "was".'},
  {q:'Which word fills: "My colleagues _____ very supportive."',opts:['am','is','was','are'],a:'are',exp:'"Colleagues" is plural, so "are".'},
  {q:'Which sentence is grammatically correct?',opts:['The meeting was yesterday.','The meeting were yesterday.','The meeting is yesterday.','The meeting am yesterday.'],a:'The meeting was yesterday.',exp:'"Meeting" is singular, past tense = "was".'},
  {q:'Fill in the blank: "She is _____ accountant."',opts:['a','an','the','no'],a:'an',exp:'"Accountant" starts with a vowel sound, so use "an".'},
  {q:'"I am good at problem-solving." This is a _____ sentence.',opts:['negative','question','affirmative','past'],a:'affirmative',exp:'Affirmative = positive, no negation.'},
  {q:'Which word makes this correct? "He _____ a brave soldier."',opts:['am','are','is','were'],a:'is',exp:'"He" uses "is" in present tense.'},
  {q:'What is the interrogative form of "I am right"?',opts:['I am right?','Am right I?','Am I right?','Is I right?'],a:'Am I right?',exp:'For questions, invert: Am + I + right?'},
  {q:'Choose the correct past tense: "I _____ in Mumbai last year."',opts:['am','is','are','was'],a:'was',exp:'"I" uses "was" in past tense.'},
  {q:'Which of these is an example of be verb for description?',opts:['He is at work.','She is a nurse.','They are tired.','I am from Delhi.'],a:'They are tired.',exp:'"Tired" describes a physical state — description/condition.'},
  {q:'Which is the correct negative contraction of "are not"?',opts:['amn\'t','isn\'t','weren\'t','aren\'t'],a:'aren\'t',exp:'"Aren\'t" = are not.'},
  {q:'How do you say "क्या वह इंजीनियर है?" in English?',opts:['Is she an engineer?','She is an engineer?','Are she an engineer?','Was she an engineer?'],a:'Is she an engineer?',exp:'Interrogative: Is + she + an engineer?'},
  {q:'Choose the correct sentence in past tense for "वे थके हुए थे".',opts:['They are tired.','They is tired.','They were tired.','They was tired.'],a:'They were tired.',exp:'"They" uses "were" in past tense.'},
  {q:'What does "I\'m not ready" mean in Hindi?',opts:['मैं तैयार हूँ।','मैं तैयार नहीं हूँ।','वह तैयार नहीं है।','हम तैयार नहीं हैं।'],a:'मैं तैयार नहीं हूँ।',exp:'"I\'m not ready" = I am not ready = मैं तैयार नहीं हूँ।'},
  {q:'What type of verb is "am" in the sentence "I am happy"?',opts:['Action verb','Helping verb','Linking/be verb','Modal verb'],a:'Linking/be verb',exp:'"Am" here connects the subject to its description — it is a linking/be verb.'},
];

for (const m of mcqData) {
  addMCQ(m.q, m.opts, m.a, m.exp);
}

// Ensure we have enough - add more fill/error/translate until we reach 350
// Add more fill questions
const moreFills = [
  {s:'I _____ very proud of my work.',b:'am',d:['is','are','was']},
  {s:'She _____ an expert in her field.',b:'is',d:['am','are','were']},
  {s:'We _____ committed to the project.',b:'are',d:['am','is','was']},
  {s:'The results _____ excellent.',b:'are',d:['am','is','was']},
  {s:'He _____ promoted last month.',b:'was',d:['am','is','are']},
  {s:'They _____ our best clients.',b:'are',d:['am','is','was']},
  {s:'I _____ grateful for the opportunity.',b:'am',d:['is','are','were']},
  {s:'She _____ a very skilled communicator.',b:'is',d:['am','are','was']},
  {s:'The project _____ finally complete.',b:'is',d:['am','are','was']},
  {s:'He _____ a responsible leader.',b:'is',d:['am','are','were']},
  {s:'We _____ on time for the meeting.',b:'were',d:['am','is','are']},
  {s:'I _____ happy to help.',b:'am',d:['is','are','was']},
  {s:'She _____ very well-qualified.',b:'is',d:['am','are','were']},
  {s:'They _____ very enthusiastic about the plan.',b:'are',d:['am','is','was']},
  {s:'He _____ very patient with his team.',b:'is',d:['am','are','were']},
  {s:'I _____ available for an interview.',b:'am',d:['is','are','was']},
  {s:'The deadline _____ tomorrow.',b:'is',d:['am','are','was']},
  {s:'We _____ a multinational company.',b:'are',d:['am','is','was']},
  {s:'She _____ the new team leader.',b:'is',d:['am','are','was']},
  {s:'I _____ not available on Monday.',b:'am',d:['is','are','was']},
  {s:'He _____ in Bengaluru for a meeting.',b:'is',d:['am','are','was']},
  {s:'You _____ welcome here.',b:'are',d:['am','is','was']},
  {s:'The conference room _____ empty.',b:'is',d:['am','are','was']},
  {s:'We _____ grateful for your feedback.',b:'are',d:['am','is','was']},
  {s:'I _____ always punctual.',b:'am',d:['is','are','was']},
  {s:'She _____ disappointed with the outcome.',b:'is',d:['am','are','were']},
  {s:'He _____ determined to succeed.',b:'is',d:['am','are','were']},
  {s:'They _____ excited about the new product.',b:'are',d:['am','is','was']},
  {s:'I _____ responsible for the report.',b:'am',d:['is','are','was']},
  {s:'The office _____ open from 9 to 6.',b:'is',d:['am','are','was']},
];

for (const f of moreFills) {
  if (dtId <= 350) addFill(f.s, f.b, f.d, null);
}

// Add more error corrections
const moreErrors = [
  ['I is responsible for this project.','I am responsible for this project.'],
  ['She are a very skilled manager.','She is a very skilled manager.'],
  ['We is committed to quality.','We are committed to quality.'],
  ['He are absent from work today.','He is absent from work today.'],
  ['They was very excited yesterday.','They were very excited yesterday.'],
  ['I were available last week.','I was available last week.'],
  ['She were a student last year.','She was a student last year.'],
  ['Is they ready for the meeting?','Are they ready for the meeting?'],
  ['I am a engineer with five years experience.','I am an engineer with five years experience.'],
  ['He is a honest professional.','He is an honest professional.'],
  ['Are I late for the meeting?','Am I late for the meeting?'],
  ['Was they at the conference?','Were they at the conference?'],
  ['She is very experience in sales.','She is very experienced in sales.'],
  ['He am the manager of this team.','He is the manager of this team.'],
  ['I are not sure about this.','I am not sure about this.'],
];

for (const e of moreErrors) {
  if (dtId <= 380) addError(e[0], e[1]);
}

// Add more MCQs if needed
const moreMCQs = [
  {q:'Which sentence uses be verb for nationality?',opts:['I am tired.','She is in school.','He is Indian.','We were busy.'],a:'He is Indian.',exp:'"Indian" is a nationality; be verb used for identity.'},
  {q:'Which of these is a correct contraction?',opts:['I\'s ready','They\'re tired','We\'re is here','She\'am happy'],a:'They\'re tired',exp:'"They\'re" = They are.'},
  {q:'"Was" is used with which subjects?',opts:['We, You, They','I, He, She, It','Only I','Only He'],a:'I, He, She, It',exp:'"Was" is used with singular subjects: I, He, She, It.'},
  {q:'Fill: "_____ you a doctor?"',opts:['Am','Is','Was','Are'],a:'Are',exp:'"You" uses "are"; question form = "Are you...?"'},
  {q:'Which sentence is in negative form?',opts:['She is a nurse.','He was tired.','They are ready.','I am not happy.'],a:'I am not happy.',exp:'"Not" makes it negative.'},
  {q:'What is the affirmative of "He isn\'t here"?',opts:['He are here.','He am here.','He is here.','He was here.'],a:'He is here.',exp:'Remove "n\'t" and change to positive: "He is here."'},
  {q:'"Are" is the past form of which be verb?',opts:['is','am','were','been'],a:'were',exp:'"Are" → "were" in past tense.'},
  {q:'Which sentence correctly uses "be verb" for age?',opts:['I have 25 years.','I am 25 years.','I am 25 years old.','I is 25 years old.'],a:'I am 25 years old.',exp:'Correct: I am X years old.'},
  {q:'Which sentence is correct?',opts:['I am a honest student.','I am an honest student.','I is an honest student.','I are an honest student.'],a:'I am an honest student.',exp:'"An" before vowel sound; "I am" correct.'},
  {q:'Which word means the same as "was" for They/We?',opts:['is','am','are','were'],a:'were',exp:'"Were" is past tense for We/They/You.'},
  {q:'Which sentence means "मैं घबराया नहीं हूँ"?',opts:['I am nervous.','I am not nervous.','I was nervous.','I were not nervous.'],a:'I am not nervous.',exp:'"Not" added after "am".'},
  {q:'What is the full form of "aren\'t"?',opts:['am not','is not','are not','was not'],a:'are not',exp:'"Aren\'t" = are + not.'},
  {q:'Choose the sentence that shows be verb for emotion/state.',opts:['He is a pilot.','She is in Mumbai.','I am excited.','This is my book.'],a:'I am excited.',exp:'"Excited" is an emotion — be verb for state.'},
  {q:'Which sentence correctly expresses present tense?',opts:['I was ready.','She were tired.','He is smart.','We was happy.'],a:'He is smart.',exp:'"Is" is present tense.'},
  {q:'In "You are a team player", what is the be verb?',opts:['you','team','player','are'],a:'are',exp:'"Are" is the be verb connecting "you" to "team player".'},
  {q:'How do you negate "She is ready"?',opts:['She not ready.','She is ready not.','She is not ready.','She isn\'t ready. (Both c and this)'],a:'She isn\'t ready. (Both c and this)',exp:'Both "She is not ready" and "She isn\'t ready" are correct.'},
  {q:'Which answer is the correct translation of "वह अनुपस्थित है"?',opts:['He is present.','He is absent.','She was absent.','He are absent.'],a:'He is absent.',exp:'"अनुपस्थित" = absent; "है" = is.'},
  {q:'What is the be verb in "They were in Delhi last year"?',opts:['They','Delhi','last year','were'],a:'were',exp:'"Were" is the be verb (past tense).'},
];

for (const m of moreMCQs) {
  if (dtId <= 400) addMCQ(m.q, m.opts, m.a, m.exp);
}

// Trim to max 400 and min 300
const finalDT = dtQuestions.slice(0, 400);

const dtOut = {
  day: 4,
  topic: "Be Verb (Am, Is, Are, Was, Were)",
  totalQuestions: finalDT.length,
  questions: finalDT
};

fs.writeFileSync(path.join(BASE,'daily-test.json'), JSON.stringify(dtOut, null, 2));
console.log('daily-test.json written:', finalDT.length);

// Verify all counts
console.log('\n=== FINAL COUNTS ===');
const pq = JSON.parse(fs.readFileSync(path.join(BASE,'practice-questions.json')));
const voc = JSON.parse(fs.readFileSync(path.join(BASE,'vocabulary.json')));
const dt = JSON.parse(fs.readFileSync(path.join(BASE,'daily-test.json')));
console.log('practice-questions:', pq.questions.length, '(totalQuestions:', pq.totalQuestions, ')');
console.log('vocabulary:', voc.words.length, '(totalWords:', voc.totalWords, ')');
console.log('daily-test:', dt.questions.length, '(totalQuestions:', dt.totalQuestions, ')');
