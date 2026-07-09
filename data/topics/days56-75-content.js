// ============================================================
// 75 DAYS HARD ENGLISH - DAYS 56-75 COMPLETE LEARNING DATA
// Vocabulary Days (56-68), Writing Days (69-73),
// Full Revision (74), Final Mock Test (75)
// ============================================================

const DAYS_56_TO_75 = {

  // ============================================================
  // DAY 56: MISCELLANEOUS VOCABULARY - NOUNS + ADJECTIVES
  // ============================================================
  day56: {
    day: 56,
    title: "Miscellaneous Vocabulary - Nouns + Adjectives",
    category: "vocabulary",
    difficulty: "medium",
    duration: 60,
    description: "100+ important nouns and adjectives used in daily life, office, and conversations.",
    vocabulary: [
      { word: "Abundance", hindi: "प्रचुरता", category: "noun", example: "There is an abundance of fruits this season.", hindiExample: "इस मौसम में फलों की प्रचुरता है।", synonyms: ["plenty", "surplus"], antonyms: ["scarcity", "lack"] },
      { word: "Ambiguity", hindi: "अस्पष्टता", category: "noun", example: "There was ambiguity in his statement.", hindiExample: "उसके बयान में अस्पष्टता थी।", synonyms: ["vagueness", "uncertainty"], antonyms: ["clarity", "certainty"] },
      { word: "Brevity", hindi: "संक्षिप्तता", category: "noun", example: "Brevity is the soul of wit.", hindiExample: "संक्षिप्तता बुद्धिमत्ता की आत्मा है।", synonyms: ["conciseness", "terseness"], antonyms: ["verbosity", "length"] },
      { word: "Candour", hindi: "स्पष्टवादिता", category: "noun", example: "She spoke with candour about her feelings.", hindiExample: "उसने अपनी भावनाओं के बारे में स्पष्टवादिता से बात की।", synonyms: ["frankness", "honesty"], antonyms: ["deception", "dishonesty"] },
      { word: "Diligence", hindi: "परिश्रम", category: "noun", example: "His diligence earned him a promotion.", hindiExample: "उसके परिश्रम ने उसे पदोन्नति दिलाई।", synonyms: ["hard work", "perseverance"], antonyms: ["laziness", "negligence"] },
      { word: "Eloquence", hindi: "वाक्पटुता", category: "noun", example: "The speaker's eloquence captivated the audience.", hindiExample: "वक्ता की वाक्पटुता ने दर्शकों को मंत्रमुग्ध कर दिया।", synonyms: ["fluency", "expressiveness"], antonyms: ["inarticulateness"] },
      { word: "Frugality", hindi: "मितव्ययिता", category: "noun", example: "Frugality helped him save money.", hindiExample: "मितव्ययिता ने उसे पैसे बचाने में मदद की।", synonyms: ["thrift", "economy"], antonyms: ["extravagance", "waste"] },
      { word: "Gratitude", hindi: "कृतज्ञता", category: "noun", example: "She expressed gratitude for the help.", hindiExample: "उसने मदद के लिए कृतज्ञता व्यक्त की।", synonyms: ["thankfulness", "appreciation"], antonyms: ["ingratitude", "ungratefulness"] },
      { word: "Humility", hindi: "विनम्रता", category: "noun", example: "He showed great humility in victory.", hindiExample: "उसने जीत में बड़ी विनम्रता दिखाई।", synonyms: ["modesty", "meekness"], antonyms: ["arrogance", "pride"] },
      { word: "Integrity", hindi: "ईमानदारी / सत्यनिष्ठा", category: "noun", example: "A person of integrity never lies.", hindiExample: "ईमानदार व्यक्ति कभी झूठ नहीं बोलता।", synonyms: ["honesty", "uprightness"], antonyms: ["dishonesty", "corruption"] },
      { word: "Jubilation", hindi: "उल्लास", category: "noun", example: "There was jubilation after the team won.", hindiExample: "टीम की जीत के बाद उल्लास था।", synonyms: ["joy", "exultation"], antonyms: ["sadness", "grief"] },
      { word: "Kindness", hindi: "दयालुता", category: "noun", example: "She showed kindness to the poor.", hindiExample: "उसने गरीबों के प्रति दयालुता दिखाई।", synonyms: ["generosity", "compassion"], antonyms: ["cruelty", "unkindness"] },
      { word: "Lethargy", hindi: "सुस्ती", category: "noun", example: "Lethargy prevented him from working.", hindiExample: "सुस्ती ने उसे काम करने से रोका।", synonyms: ["laziness", "sluggishness"], antonyms: ["energy", "alertness"] },
      { word: "Modesty", hindi: "शालीनता", category: "noun", example: "Her modesty is admirable.", hindiExample: "उसकी शालीनता प्रशंसनीय है।", synonyms: ["humility", "simplicity"], antonyms: ["arrogance", "vanity"] },
      { word: "Nobility", hindi: "कुलीनता / महानता", category: "noun", example: "He acted with nobility during the crisis.", hindiExample: "संकट के दौरान उसने महानता से काम किया।", synonyms: ["dignity", "grandeur"], antonyms: ["baseness", "vulgarity"] },
      { word: "Optimism", hindi: "आशावाद", category: "noun", example: "Optimism helps in difficult times.", hindiExample: "आशावाद कठिन समय में मदद करता है।", synonyms: ["hopefulness", "positivity"], antonyms: ["pessimism", "negativity"] },
      { word: "Perseverance", hindi: "दृढ़ता", category: "noun", example: "Perseverance leads to success.", hindiExample: "दृढ़ता सफलता की ओर ले जाती है।", synonyms: ["persistence", "determination"], antonyms: ["giving up", "weakness"] },
      { word: "Quickness", hindi: "तेजी", category: "noun", example: "His quickness impressed the coach.", hindiExample: "उसकी तेजी ने कोच को प्रभावित किया।", synonyms: ["speed", "swiftness"], antonyms: ["slowness", "sluggishness"] },
      { word: "Resilience", hindi: "लचीलापन / सहनशीलता", category: "noun", example: "Resilience is key to overcoming failure.", hindiExample: "असफलता से उबरने के लिए सहनशीलता जरूरी है।", synonyms: ["toughness", "flexibility"], antonyms: ["fragility", "weakness"] },
      { word: "Serenity", hindi: "शांति", category: "noun", example: "She found serenity in meditation.", hindiExample: "उसे ध्यान में शांति मिली।", synonyms: ["calmness", "peace"], antonyms: ["chaos", "turmoil"] },
      { word: "Tenacity", hindi: "जिद / दृढ़निश्चय", category: "noun", example: "His tenacity helped him win.", hindiExample: "उसके दृढ़निश्चय ने उसे जीत दिलाई।", synonyms: ["persistence", "stubbornness"], antonyms: ["weakness", "yielding"] },
      { word: "Uprightness", hindi: "सत्यनिष्ठा", category: "noun", example: "His uprightness was known to all.", hindiExample: "उसकी सत्यनिष्ठा सबको पता थी।", synonyms: ["honesty", "virtue"], antonyms: ["dishonesty", "corruption"] },
      { word: "Vigilance", hindi: "सतर्कता", category: "noun", example: "Vigilance is necessary for safety.", hindiExample: "सुरक्षा के लिए सतर्कता जरूरी है।", synonyms: ["alertness", "watchfulness"], antonyms: ["carelessness", "negligence"] },
      { word: "Wisdom", hindi: "ज्ञान / बुद्धिमत्ता", category: "noun", example: "Wisdom comes with experience.", hindiExample: "ज्ञान अनुभव से आता है।", synonyms: ["intelligence", "sagacity"], antonyms: ["foolishness", "ignorance"] },
      { word: "Zeal", hindi: "उत्साह", category: "noun", example: "She worked with great zeal.", hindiExample: "उसने बड़े उत्साह से काम किया।", synonyms: ["enthusiasm", "passion"], antonyms: ["apathy", "indifference"] },
      // ADJECTIVES
      { word: "Adamant", hindi: "अडिग", category: "adjective", example: "He was adamant about his decision.", hindiExample: "वह अपने फैसले पर अडिग था।", synonyms: ["firm", "resolute"], antonyms: ["flexible", "yielding"] },
      { word: "Benevolent", hindi: "परोपकारी", category: "adjective", example: "She is a benevolent person.", hindiExample: "वह एक परोपकारी व्यक्ति है।", synonyms: ["kind", "charitable"], antonyms: ["cruel", "selfish"] },
      { word: "Cautious", hindi: "सावधान", category: "adjective", example: "Be cautious while crossing the road.", hindiExample: "सड़क पार करते समय सावधान रहें।", synonyms: ["careful", "wary"], antonyms: ["careless", "reckless"] },
      { word: "Dexterous", hindi: "कुशल", category: "adjective", example: "He is dexterous with his hands.", hindiExample: "वह हाथों से काम करने में कुशल है।", synonyms: ["skillful", "adroit"], antonyms: ["clumsy", "awkward"] },
      { word: "Enthusiastic", hindi: "उत्साही", category: "adjective", example: "She is enthusiastic about learning.", hindiExample: "वह सीखने के बारे में उत्साही है।", synonyms: ["eager", "passionate"], antonyms: ["apathetic", "indifferent"] },
      { word: "Fervent", hindi: "उत्कट", category: "adjective", example: "He is a fervent supporter of education.", hindiExample: "वह शिक्षा का उत्कट समर्थक है।", synonyms: ["ardent", "passionate"], antonyms: ["indifferent", "cold"] },
      { word: "Generous", hindi: "उदार", category: "adjective", example: "She is generous with her time.", hindiExample: "वह अपने समय के साथ उदार है।", synonyms: ["giving", "charitable"], antonyms: ["stingy", "selfish"] },
      { word: "Honest", hindi: "ईमानदार", category: "adjective", example: "An honest person earns respect.", hindiExample: "ईमानदार व्यक्ति सम्मान पाता है।", synonyms: ["truthful", "sincere"], antonyms: ["dishonest", "deceitful"] },
      { word: "Industrious", hindi: "मेहनती", category: "adjective", example: "Industrious students always succeed.", hindiExample: "मेहनती छात्र हमेशा सफल होते हैं।", synonyms: ["hardworking", "diligent"], antonyms: ["lazy", "idle"] },
      { word: "Jovial", hindi: "प्रसन्नचित्त", category: "adjective", example: "He is always jovial and cheerful.", hindiExample: "वह हमेशा प्रसन्नचित्त और खुशमिजाज रहता है।", synonyms: ["cheerful", "merry"], antonyms: ["gloomy", "sad"] },
      { word: "Keen", hindi: "उत्सुक / तीव्र", category: "adjective", example: "She has a keen interest in music.", hindiExample: "उसे संगीत में गहरी रुचि है।", synonyms: ["eager", "sharp"], antonyms: ["dull", "indifferent"] },
      { word: "Lively", hindi: "जीवंत", category: "adjective", example: "She has a lively personality.", hindiExample: "उसका व्यक्तित्व जीवंत है।", synonyms: ["energetic", "vibrant"], antonyms: ["dull", "lifeless"] },
      { word: "Meticulous", hindi: "सूक्ष्मदर्शी / सावधान", category: "adjective", example: "He is meticulous in his work.", hindiExample: "वह अपने काम में बहुत सावधान है।", synonyms: ["careful", "precise"], antonyms: ["careless", "sloppy"] },
      { word: "Naive", hindi: "भोला", category: "adjective", example: "She was naive to believe him.", hindiExample: "उस पर विश्वास करना उसकी भोलापन था।", synonyms: ["innocent", "gullible"], antonyms: ["experienced", "wise"] },
      { word: "Obedient", hindi: "आज्ञाकारी", category: "adjective", example: "He is an obedient child.", hindiExample: "वह एक आज्ञाकारी बच्चा है।", synonyms: ["compliant", "dutiful"], antonyms: ["disobedient", "rebellious"] },
      { word: "Patient", hindi: "धैर्यवान", category: "adjective", example: "Be patient; results take time.", hindiExample: "धैर्य रखो; परिणाम में समय लगता है।", synonyms: ["calm", "tolerant"], antonyms: ["impatient", "hasty"] },
      { word: "Prudent", hindi: "विवेकी", category: "adjective", example: "A prudent person thinks before acting.", hindiExample: "विवेकी व्यक्ति कार्य से पहले सोचता है।", synonyms: ["wise", "sensible"], antonyms: ["foolish", "reckless"] },
      { word: "Rational", hindi: "तर्कसंगत", category: "adjective", example: "Make rational decisions in life.", hindiExample: "जीवन में तर्कसंगत निर्णय लें।", synonyms: ["logical", "reasonable"], antonyms: ["irrational", "illogical"] },
      { word: "Sincere", hindi: "ईमानदार / सच्चा", category: "adjective", example: "She is sincere in her efforts.", hindiExample: "वह अपने प्रयासों में सच्ची है।", synonyms: ["genuine", "honest"], antonyms: ["insincere", "fake"] },
      { word: "Tactful", hindi: "चतुर / कूटनीतिज्ञ", category: "adjective", example: "He handled the situation tactfully.", hindiExample: "उसने स्थिति को चतुराई से संभाला।", synonyms: ["diplomatic", "skillful"], antonyms: ["tactless", "blunt"] },
      { word: "Unique", hindi: "अद्वितीय", category: "adjective", example: "Everyone has a unique talent.", hindiExample: "हर किसी में एक अद्वितीय प्रतिभा होती है।", synonyms: ["special", "distinctive"], antonyms: ["common", "ordinary"] },
      { word: "Valiant", hindi: "वीर", category: "adjective", example: "He was a valiant soldier.", hindiExample: "वह एक वीर सैनिक था।", synonyms: ["brave", "courageous"], antonyms: ["cowardly", "timid"] },
      { word: "Witty", hindi: "हाजिरजवाब", category: "adjective", example: "She gave a witty reply.", hindiExample: "उसने हाजिरजवाबी से जवाब दिया।", synonyms: ["clever", "humorous"], antonyms: ["dull", "humorless"] },
      { word: "Zealous", hindi: "उत्साही / जोशीला", category: "adjective", example: "He is zealous about his work.", hindiExample: "वह अपने काम के बारे में जोशीला है।", synonyms: ["passionate", "fervent"], antonyms: ["apathetic", "unenthusiastic"] },
      { word: "Agile", hindi: "फुर्तीला", category: "adjective", example: "An agile mind solves problems quickly.", hindiExample: "फुर्तीला दिमाग जल्दी समस्याएं सुलझाता है।", synonyms: ["nimble", "quick"], antonyms: ["slow", "sluggish"] },
      { word: "Brilliant", hindi: "प्रतिभाशाली / चमकदार", category: "adjective", example: "She is a brilliant student.", hindiExample: "वह एक प्रतिभाशाली छात्रा है।", synonyms: ["intelligent", "bright"], antonyms: ["dull", "dim"] },
      { word: "Compassionate", hindi: "दयालु", category: "adjective", example: "A compassionate leader cares for others.", hindiExample: "दयालु नेता दूसरों की परवाह करता है।", synonyms: ["kind", "sympathetic"], antonyms: ["cruel", "heartless"] },
      { word: "Determined", hindi: "दृढ़संकल्पित", category: "adjective", example: "She is determined to succeed.", hindiExample: "वह सफल होने के लिए दृढ़संकल्पित है।", synonyms: ["resolute", "firm"], antonyms: ["indecisive", "wavering"] },
      { word: "Energetic", hindi: "ऊर्जावान", category: "adjective", example: "Young people are energetic.", hindiExample: "युवा लोग ऊर्जावान होते हैं।", synonyms: ["active", "vigorous"], antonyms: ["lethargic", "tired"] },
      { word: "Faithful", hindi: "वफादार", category: "adjective", example: "A faithful friend never betrays.", hindiExample: "वफादार दोस्त कभी धोखा नहीं देता।", synonyms: ["loyal", "devoted"], antonyms: ["unfaithful", "disloyal"] },
      { word: "Gracious", hindi: "कृपालु", category: "adjective", example: "She gave a gracious reply.", hindiExample: "उसने कृपालुता से जवाब दिया।", synonyms: ["kind", "courteous"], antonyms: ["rude", "unkind"] },
      { word: "Humble", hindi: "विनम्र", category: "adjective", example: "Despite success, he remained humble.", hindiExample: "सफलता के बावजूद वह विनम्र रहा।", synonyms: ["modest", "meek"], antonyms: ["arrogant", "proud"] },
      { word: "Imaginative", hindi: "कल्पनाशील", category: "adjective", example: "She is an imaginative writer.", hindiExample: "वह एक कल्पनाशील लेखिका है।", synonyms: ["creative", "inventive"], antonyms: ["unimaginative", "dull"] },
      { word: "Judicious", hindi: "विवेकपूर्ण", category: "adjective", example: "Make judicious use of your time.", hindiExample: "अपने समय का विवेकपूर्ण उपयोग करें।", synonyms: ["wise", "sensible"], antonyms: ["foolish", "unwise"] },
      { word: "Lenient", hindi: "उदार / नरम", category: "adjective", example: "The teacher was lenient with students.", hindiExample: "शिक्षक छात्रों के प्रति उदार था।", synonyms: ["mild", "merciful"], antonyms: ["strict", "harsh"] },
      { word: "Motivated", hindi: "प्रेरित", category: "adjective", example: "Stay motivated to achieve your goals.", hindiExample: "अपने लक्ष्यों को पाने के लिए प्रेरित रहें।", synonyms: ["inspired", "driven"], antonyms: ["demotivated", "discouraged"] },
      { word: "Notorious", hindi: "कुख्यात", category: "adjective", example: "He was notorious for his bad habits.", hindiExample: "वह अपनी बुरी आदतों के लिए कुख्यात था।", synonyms: ["infamous", "disreputable"], antonyms: ["reputable", "famous"] },
      { word: "Outstanding", hindi: "उत्कृष्ट", category: "adjective", example: "She gave an outstanding performance.", hindiExample: "उसने उत्कृष्ट प्रदर्शन किया।", synonyms: ["excellent", "exceptional"], antonyms: ["ordinary", "mediocre"] },
      { word: "Passionate", hindi: "भावुक / जोशीला", category: "adjective", example: "He is passionate about cricket.", hindiExample: "वह क्रिकेट के बारे में जोशीला है।", synonyms: ["fervent", "enthusiastic"], antonyms: ["indifferent", "apathetic"] },
      { word: "Reliable", hindi: "विश्वसनीय", category: "adjective", example: "She is a reliable employee.", hindiExample: "वह एक विश्वसनीय कर्मचारी है।", synonyms: ["dependable", "trustworthy"], antonyms: ["unreliable", "untrustworthy"] },
      { word: "Sensible", hindi: "समझदार", category: "adjective", example: "He made a sensible choice.", hindiExample: "उसने एक समझदारी भरा फैसला किया।", synonyms: ["wise", "reasonable"], antonyms: ["foolish", "senseless"] },
      { word: "Tolerant", hindi: "सहिष्णु", category: "adjective", example: "A tolerant society respects all cultures.", hindiExample: "सहिष्णु समाज सभी संस्कृतियों का सम्मान करता है।", synonyms: ["open-minded", "patient"], antonyms: ["intolerant", "narrow-minded"] },
      { word: "Versatile", hindi: "बहुमुखी प्रतिभावान", category: "adjective", example: "She is a versatile artist.", hindiExample: "वह एक बहुमुखी प्रतिभावान कलाकार है।", synonyms: ["adaptable", "flexible"], antonyms: ["limited", "one-sided"] },
      { word: "Vibrant", hindi: "जीवंत / ऊर्जावान", category: "adjective", example: "The city has a vibrant culture.", hindiExample: "शहर की संस्कृति जीवंत है।", synonyms: ["lively", "energetic"], antonyms: ["dull", "lifeless"] },
      { word: "Wholesome", hindi: "स्वस्थकर", category: "adjective", example: "Eat wholesome food for good health.", hindiExample: "अच्छे स्वास्थ्य के लिए स्वस्थकर भोजन खाएं।", synonyms: ["healthy", "nutritious"], antonyms: ["unhealthy", "harmful"] },
      { word: "Youthful", hindi: "युवा", category: "adjective", example: "She has a youthful energy.", hindiExample: "उसमें युवा ऊर्जा है।", synonyms: ["young", "vigorous"], antonyms: ["old", "aged"] },
      // MORE NOUNS
      { word: "Accomplishment", hindi: "उपलब्धि", category: "noun", example: "Winning was a great accomplishment.", hindiExample: "जीतना एक बड़ी उपलब्धि थी।", synonyms: ["achievement", "success"], antonyms: ["failure", "defeat"] },
      { word: "Ambition", hindi: "महत्वाकांक्षा", category: "noun", example: "Ambition drives a person to succeed.", hindiExample: "महत्वाकांक्षा व्यक्ति को सफल बनाती है।", synonyms: ["aspiration", "desire"], antonyms: ["contentment", "satisfaction"] },
      { word: "Compassion", hindi: "करुणा", category: "noun", example: "Compassion for others is a virtue.", hindiExample: "दूसरों के लिए करुणा एक गुण है।", synonyms: ["sympathy", "empathy"], antonyms: ["cruelty", "indifference"] },
      { word: "Devotion", hindi: "समर्पण", category: "noun", example: "Devotion to duty brings success.", hindiExample: "कर्तव्य के प्रति समर्पण सफलता लाता है।", synonyms: ["dedication", "commitment"], antonyms: ["neglect", "indifference"] },
      { word: "Empathy", hindi: "सहानुभूति", category: "noun", example: "Empathy helps build relationships.", hindiExample: "सहानुभूति संबंध बनाने में मदद करती है।", synonyms: ["understanding", "compassion"], antonyms: ["indifference", "apathy"] },
      { word: "Fortitude", hindi: "साहस / धैर्य", category: "noun", example: "He faced hardship with fortitude.", hindiExample: "उसने साहस के साथ कठिनाइयों का सामना किया।", synonyms: ["courage", "bravery"], antonyms: ["cowardice", "weakness"] },
      { word: "Generosity", hindi: "उदारता", category: "noun", example: "His generosity helped many poor people.", hindiExample: "उसकी उदारता ने कई गरीब लोगों की मदद की।", synonyms: ["charity", "benevolence"], antonyms: ["selfishness", "greed"] },
      { word: "Harmony", hindi: "सामंजस्य", category: "noun", example: "Live in harmony with nature.", hindiExample: "प्रकृति के साथ सामंजस्य में रहें।", synonyms: ["peace", "unity"], antonyms: ["discord", "conflict"] },
      { word: "Innovation", hindi: "नवाचार", category: "noun", example: "Innovation is the key to progress.", hindiExample: "नवाचार प्रगति की कुंजी है।", synonyms: ["invention", "creativity"], antonyms: ["stagnation", "tradition"] },
      { word: "Justice", hindi: "न्याय", category: "noun", example: "Justice must be served to all.", hindiExample: "सभी को न्याय मिलना चाहिए।", synonyms: ["fairness", "equity"], antonyms: ["injustice", "unfairness"] },
    ],
    practiceQuestions: [
      { id: 1, question: "'Diligence' का हिंदी अर्थ क्या है?", answer: "परिश्रम", type: "translation" },
      { id: 2, question: "'She showed great _____ in her work.' (Diligence/Lethargy) सही शब्द चुनें।", answer: "Diligence", type: "fill-in-blank" },
      { id: 3, question: "'Optimism' का विलोम शब्द क्या है?", answer: "Pessimism", type: "antonym" },
      { id: 4, question: "'Resilience' का पर्यायवाची शब्द लिखें।", answer: "Toughness / Flexibility", type: "synonym" },
      { id: 5, question: "'Humility' को एक वाक्य में प्रयोग करें।", answer: "He showed humility despite being very successful.", type: "sentence-making" },
      { id: 6, question: "'Vigilance' का अर्थ क्या है?", answer: "सतर्कता", type: "translation" },
      { id: 7, question: "'Generous' का विलोम क्या है?", answer: "Stingy / Selfish", type: "antonym" },
      { id: 8, question: "वाक्य पूरा करें: 'A _____ person always tells the truth.' (Honest/Naive)", answer: "Honest", type: "fill-in-blank" },
      { id: 9, question: "'Compassion' और 'Empathy' में क्या अंतर है?", answer: "Compassion = करुणा (wanting to help), Empathy = सहानुभूति (understanding feelings)", type: "difference" },
      { id: 10, question: "'Zealous' का प्रयोग किस संदर्भ में होता है?", answer: "जब कोई किसी काम के बारे में बहुत उत्साही और जोशीला हो", type: "usage" },
    ],
    testQuestions: [
      { id: 1, question: "What is the Hindi meaning of 'Eloquence'?", options: ["वाक्पटुता", "सुस्ती", "कृतज्ञता", "विनम्रता"], answer: "वाक्पटुता", type: "mcq" },
      { id: 2, question: "Which word means 'परिश्रम' in English?", options: ["Lethargy", "Diligence", "Brevity", "Candour"], answer: "Diligence", type: "mcq" },
      { id: 3, question: "Antonym of 'Optimism' is:", options: ["Hopefulness", "Pessimism", "Positivity", "Zeal"], answer: "Pessimism", type: "mcq" },
      { id: 4, question: "Which is an ADJECTIVE?", options: ["Wisdom", "Gratitude", "Benevolent", "Justice"], answer: "Benevolent", type: "mcq" },
      { id: 5, question: "'Adamant' means:", options: ["अडिग", "उदार", "भोला", "विनम्र"], answer: "अडिग", type: "mcq" },
      { id: 6, question: "Synonym of 'Resilience' is:", options: ["Fragility", "Toughness", "Laziness", "Sorrow"], answer: "Toughness", type: "mcq" },
      { id: 7, question: "Which word describes a person who is always cheerful?", options: ["Lethargy", "Jovial", "Naive", "Prudent"], answer: "Jovial", type: "mcq" },
      { id: 8, question: "'Frugality' means:", options: ["उदारता", "सुस्ती", "मितव्ययिता", "साहस"], answer: "मितव्ययिता", type: "mcq" },
      { id: 9, question: "Which adjective means 'बहुमुखी प्रतिभावान'?", options: ["Vibrant", "Versatile", "Valiant", "Vigilant"], answer: "Versatile", type: "mcq" },
      { id: 10, question: "'Tenacity' is closest in meaning to:", options: ["Weakness", "Kindness", "Persistence", "Modesty"], answer: "Persistence", type: "mcq" },
      { id: 11, question: "Which word is a NOUN?", options: ["Brilliant", "Compassionate", "Innovation", "Zealous"], answer: "Innovation", type: "mcq" },
      { id: 12, question: "'Integrity' means:", options: ["ईमानदारी", "सुस्ती", "भोलापन", "उदारता"], answer: "ईमानदारी", type: "mcq" },
      { id: 13, question: "Antonym of 'Humble' is:", options: ["Modest", "Arrogant", "Gracious", "Patient"], answer: "Arrogant", type: "mcq" },
      { id: 14, question: "'Judicious' means:", options: ["Foolish", "Wise", "Cruel", "Lazy"], answer: "Wise", type: "mcq" },
      { id: 15, question: "Which word means 'उल्लास'?", options: ["Serenity", "Lethargy", "Jubilation", "Candour"], answer: "Jubilation", type: "mcq" },
      { id: 16, question: "'Meticulous' describes someone who is:", options: ["Careless", "Very careful", "Lazy", "Rude"], answer: "Very careful", type: "mcq" },
      { id: 17, question: "Synonym of 'Harmony' is:", options: ["Discord", "Peace", "Conflict", "Chaos"], answer: "Peace", type: "mcq" },
      { id: 18, question: "'Wholesome' food is:", options: ["Harmful", "Unhealthy", "Nutritious", "Stale"], answer: "Nutritious", type: "mcq" },
      { id: 19, question: "Which word describes a brave person?", options: ["Valiant", "Notorious", "Lenient", "Naive"], answer: "Valiant", type: "mcq" },
      { id: 20, question: "'Fortitude' means:", options: ["साहस / धैर्य", "सुस्ती", "प्रचुरता", "अस्पष्टता"], answer: "साहस / धैर्य", type: "mcq" },
      { id: 21, question: "A person who is 'Tactful' is:", options: ["Blunt", "Diplomatic", "Rude", "Careless"], answer: "Diplomatic", type: "mcq" },
      { id: 22, question: "'Empathy' means:", options: ["क्रोध", "सहानुभूति", "ईर्ष्या", "घृणा"], answer: "सहानुभूति", type: "mcq" },
      { id: 23, question: "Antonym of 'Notorious' is:", options: ["Infamous", "Reputable", "Disreputable", "Wicked"], answer: "Reputable", type: "mcq" },
      { id: 24, question: "'Rational' decisions are based on:", options: ["Emotion", "Logic", "Impulse", "Luck"], answer: "Logic", type: "mcq" },
      { id: 25, question: "Which word means 'नवाचार'?", options: ["Harmony", "Devotion", "Innovation", "Justice"], answer: "Innovation", type: "mcq" },
      { id: 26, question: "'Youthful' energy is associated with:", options: ["Old age", "Youth", "Illness", "Sadness"], answer: "Youth", type: "mcq" },
      { id: 27, question: "A 'Reliable' employee is:", options: ["Untrustworthy", "Dependable", "Lazy", "Reckless"], answer: "Dependable", type: "mcq" },
      { id: 28, question: "'Serenity' is another word for:", options: ["Chaos", "Calmness", "Excitement", "Anger"], answer: "Calmness", type: "mcq" },
      { id: 29, question: "Which is an antonym of 'Generous'?", options: ["Charitable", "Giving", "Stingy", "Kind"], answer: "Stingy", type: "mcq" },
      { id: 30, question: "'Compassion' and 'Empathy' both relate to:", options: ["Anger", "Understanding others", "Jealousy", "Selfishness"], answer: "Understanding others", type: "mcq" },
    ],
    exercises: [
      { type: "matching", title: "Match the word with its Hindi meaning", pairs: [["Abundance", "प्रचुरता"], ["Eloquence", "वाक्पटुता"], ["Resilience", "सहनशीलता"], ["Harmony", "सामंजस्य"], ["Fortitude", "साहस"]] },
      { type: "fill-in-blank", title: "Fill in the blanks", sentences: ["She showed great _____ in finishing the project on time. (Diligence/Lethargy)", "His _____ made everyone love him. (Kindness/Cruelty)", "Be _____ while driving on highways. (Reckless/Cautious)", "The leader handled the crisis with great _____. (Wisdom/Foolishness)"] },
    ],
  },

  // ============================================================
  // DAY 57: STATIONERY VOCABULARY
  // ============================================================
  day57: {
    day: 57,
    title: "Stationery Vocabulary",
    category: "vocabulary",
    difficulty: "easy",
    duration: 45,
    description: "Office and school stationery items vocabulary with Hindi meanings and usage.",
    vocabulary: [
      { word: "Pen", hindi: "कलम", category: "stationery", example: "Please give me a pen to sign.", hindiExample: "साइन करने के लिए मुझे कलम दो।", synonyms: ["ballpoint", "writer"], antonyms: [] },
      { word: "Pencil", hindi: "पेंसिल", category: "stationery", example: "Draw the diagram in pencil first.", hindiExample: "पहले पेंसिल से आरेख बनाओ।", synonyms: ["graphite pencil"], antonyms: [] },
      { word: "Eraser", hindi: "रबड़", category: "stationery", example: "Use an eraser to correct mistakes.", hindiExample: "गलतियाँ सुधारने के लिए रबड़ का उपयोग करें।", synonyms: ["rubber"], antonyms: [] },
      { word: "Sharpener", hindi: "शार्पनर", category: "stationery", example: "The pencil needs a sharpener.", hindiExample: "पेंसिल को शार्पनर की जरूरत है।", synonyms: ["pencil sharpener"], antonyms: [] },
      { word: "Ruler", hindi: "पैमाना / रूलर", category: "stationery", example: "Draw a straight line using a ruler.", hindiExample: "रूलर से सीधी रेखा खींचो।", synonyms: ["scale", "straightedge"], antonyms: [] },
      { word: "Notebook", hindi: "कापी / नोटबुक", category: "stationery", example: "Write your notes in the notebook.", hindiExample: "नोट्स कापी में लिखो।", synonyms: ["exercise book", "copybook"], antonyms: [] },
      { word: "Textbook", hindi: "पाठ्यपुस्तक", category: "stationery", example: "Open your textbook to page 20.", hindiExample: "अपनी पाठ्यपुस्तक का पृष्ठ 20 खोलो।", synonyms: ["coursebook", "school book"], antonyms: [] },
      { word: "Stapler", hindi: "स्टेपलर", category: "stationery", example: "Use the stapler to bind the papers.", hindiExample: "कागजों को बांधने के लिए स्टेपलर का उपयोग करें।", synonyms: ["paper stapler"], antonyms: [] },
      { word: "Staple pins", hindi: "स्टेपल पिन", category: "stationery", example: "The stapler needs new staple pins.", hindiExample: "स्टेपलर में नई स्टेपल पिन चाहिए।", synonyms: ["staples"], antonyms: [] },
      { word: "Scissors", hindi: "कैंची", category: "stationery", example: "Cut the paper with scissors.", hindiExample: "कैंची से कागज काटो।", synonyms: ["shears", "clippers"], antonyms: [] },
      { word: "Glue", hindi: "गोंद", category: "stationery", example: "Use glue to stick the chart.", hindiExample: "चार्ट चिपकाने के लिए गोंद का उपयोग करें।", synonyms: ["adhesive", "paste"], antonyms: [] },
      { word: "Tape", hindi: "टेप", category: "stationery", example: "Seal the envelope with tape.", hindiExample: "टेप से लिफाफा बंद करो।", synonyms: ["adhesive tape", "sellotape"], antonyms: [] },
      { word: "Marker", hindi: "मार्कर", category: "stationery", example: "Write the title with a marker.", hindiExample: "मार्कर से शीर्षक लिखो।", synonyms: ["felt-tip pen", "highlighter"], antonyms: [] },
      { word: "Highlighter", hindi: "हाइलाइटर", category: "stationery", example: "Highlight important points with a highlighter.", hindiExample: "महत्वपूर्ण बिंदुओं को हाइलाइटर से हाइलाइट करें।", synonyms: ["marker"], antonyms: [] },
      { word: "Calculator", hindi: "कैलकुलेटर", category: "stationery", example: "Use a calculator for complex sums.", hindiExample: "जटिल जोड़ के लिए कैलकुलेटर का उपयोग करें।", synonyms: ["computing device"], antonyms: [] },
      { word: "File", hindi: "फाइल", category: "stationery", example: "Keep documents in a file.", hindiExample: "दस्तावेज फाइल में रखें।", synonyms: ["folder", "binder"], antonyms: [] },
      { word: "Folder", hindi: "फोल्डर", category: "stationery", example: "Organize papers in a folder.", hindiExample: "कागज फोल्डर में व्यवस्थित करें।", synonyms: ["file", "binder"], antonyms: [] },
      { word: "Binder", hindi: "बाइंडर", category: "stationery", example: "Use a binder to keep notes organized.", hindiExample: "नोट्स व्यवस्थित रखने के लिए बाइंडर उपयोग करें।", synonyms: ["ring binder", "folder"], antonyms: [] },
      { word: "Envelope", hindi: "लिफाफा", category: "stationery", example: "Put the letter in the envelope.", hindiExample: "पत्र को लिफाफे में डालो।", synonyms: ["cover", "wrapper"], antonyms: [] },
      { word: "Stamp", hindi: "डाक टिकट", category: "stationery", example: "Paste a stamp on the envelope.", hindiExample: "लिफाफे पर डाक टिकट लगाओ।", synonyms: ["postage stamp"], antonyms: [] },
      { word: "Whiteboard", hindi: "व्हाइटबोर्ड", category: "stationery", example: "The teacher wrote on the whiteboard.", hindiExample: "शिक्षक ने व्हाइटबोर्ड पर लिखा।", synonyms: ["dry-erase board"], antonyms: ["blackboard"] },
      { word: "Blackboard", hindi: "श्यामपट्ट", category: "stationery", example: "She wrote on the blackboard with chalk.", hindiExample: "उसने चाक से श्यामपट्ट पर लिखा।", synonyms: ["chalkboard"], antonyms: ["whiteboard"] },
      { word: "Chalk", hindi: "चाक", category: "stationery", example: "Use white chalk to write on the board.", hindiExample: "बोर्ड पर लिखने के लिए सफेद चाक का उपयोग करें।", synonyms: ["chalk stick"], antonyms: [] },
      { word: "Duster", hindi: "डस्टर / पोंछा", category: "stationery", example: "Wipe the board with a duster.", hindiExample: "बोर्ड को डस्टर से पोंछो।", synonyms: ["eraser (board)"], antonyms: [] },
      { word: "Compass", hindi: "कम्पास / परकार", category: "stationery", example: "Draw a circle using a compass.", hindiExample: "परकार से वृत्त बनाओ।", synonyms: ["drawing compass"], antonyms: [] },
      { word: "Protractor", hindi: "चांदा", category: "stationery", example: "Measure the angle with a protractor.", hindiExample: "चांदे से कोण मापो।", synonyms: ["angle measurer"], antonyms: [] },
      { word: "Set square", hindi: "सेट स्क्वेयर", category: "stationery", example: "Use a set square to draw right angles.", hindiExample: "समकोण बनाने के लिए सेट स्क्वेयर का उपयोग करें।", synonyms: [], antonyms: [] },
      { word: "Graph paper", hindi: "ग्राफ पेपर", category: "stationery", example: "Plot the graph on graph paper.", hindiExample: "ग्राफ पेपर पर ग्राफ बनाओ।", synonyms: ["grid paper"], antonyms: [] },
      { word: "Ink", hindi: "स्याही", category: "stationery", example: "The pen has run out of ink.", hindiExample: "कलम की स्याही खत्म हो गई।", synonyms: ["dye", "pigment"], antonyms: [] },
      { word: "Blotting paper", hindi: "सोखता कागज", category: "stationery", example: "Use blotting paper to absorb excess ink.", hindiExample: "अतिरिक्त स्याही सोखने के लिए सोखता कागज उपयोग करें।", synonyms: ["absorbent paper"], antonyms: [] },
      { word: "Punching machine", hindi: "पंचिंग मशीन", category: "stationery", example: "Make holes with a punching machine.", hindiExample: "पंचिंग मशीन से छेद बनाओ।", synonyms: ["hole punch"], antonyms: [] },
      { word: "Paper clip", hindi: "पेपर क्लिप", category: "stationery", example: "Attach papers using a paper clip.", hindiExample: "पेपर क्लिप से कागज जोड़ो।", synonyms: ["clip"], antonyms: [] },
      { word: "Notice board", hindi: "सूचना पट्ट", category: "stationery", example: "The notice is on the notice board.", hindiExample: "नोटिस, सूचना पट्ट पर है।", synonyms: ["bulletin board"], antonyms: [] },
      { word: "Drawing pin", hindi: "पिन / ड्राइंग पिन", category: "stationery", example: "Pin the map with a drawing pin.", hindiExample: "नक्शे को ड्राइंग पिन से पिन करो।", synonyms: ["thumbtack", "pushpin"], antonyms: [] },
      { word: "Rubber band", hindi: "रबड़ बैंड", category: "stationery", example: "Tie the bundle with a rubber band.", hindiExample: "बंडल को रबड़ बैंड से बांधो।", synonyms: ["elastic band"], antonyms: [] },
      { word: "Diary", hindi: "डायरी", category: "stationery", example: "Write daily events in your diary.", hindiExample: "डायरी में रोज की घटनाएं लिखो।", synonyms: ["journal", "planner"], antonyms: [] },
      { word: "Calendar", hindi: "कैलेंडर", category: "stationery", example: "Check the calendar for today's date.", hindiExample: "कैलेंडर में आज की तारीख देखो।", synonyms: ["almanac", "planner"], antonyms: [] },
      { word: "Sticker", hindi: "स्टीकर", category: "stationery", example: "Put a sticker on the notebook.", hindiExample: "कापी पर स्टीकर लगाओ।", synonyms: ["label", "decal"], antonyms: [] },
      { word: "Label", hindi: "लेबल", category: "stationery", example: "Write your name on the label.", hindiExample: "लेबल पर अपना नाम लिखो।", synonyms: ["tag", "sticker"], antonyms: [] },
      { word: "Ink pad", hindi: "स्याही पैड", category: "stationery", example: "Dip the stamp in the ink pad.", hindiExample: "स्टाम्प को स्याही पैड में डुबोओ।", synonyms: ["stamp pad"], antonyms: [] },
      { word: "Dustbin", hindi: "कूड़ेदान", category: "stationery", example: "Throw waste paper in the dustbin.", hindiExample: "कूड़ेदान में बेकार कागज फेंको।", synonyms: ["trash can", "waste basket"], antonyms: [] },
      { word: "Projector", hindi: "प्रोजेक्टर", category: "stationery", example: "Show the presentation on the projector.", hindiExample: "प्रोजेक्टर पर प्रेजेंटेशन दिखाओ।", synonyms: ["display device"], antonyms: [] },
      { word: "Laptop", hindi: "लैपटॉप", category: "stationery", example: "She works on her laptop.", hindiExample: "वह लैपटॉप पर काम करती है।", synonyms: ["notebook computer"], antonyms: [] },
      { word: "Printer", hindi: "प्रिंटर", category: "stationery", example: "Print the document from the printer.", hindiExample: "प्रिंटर से दस्तावेज प्रिंट करो।", synonyms: ["photoprinter"], antonyms: [] },
      { word: "Scanner", hindi: "स्कैनर", category: "stationery", example: "Scan the document with a scanner.", hindiExample: "स्कैनर से दस्तावेज स्कैन करो।", synonyms: ["document scanner"], antonyms: [] },
      { word: "Photocopier", hindi: "फोटोकॉपी मशीन", category: "stationery", example: "Make a photocopy of this form.", hindiExample: "इस फॉर्म की फोटोकॉपी बनाओ।", synonyms: ["copier", "xerox machine"], antonyms: [] },
      { word: "Mouse pad", hindi: "माउस पैड", category: "stationery", example: "Place the mouse on the mouse pad.", hindiExample: "माउस पैड पर माउस रखो।", synonyms: ["mouse mat"], antonyms: [] },
      { word: "USB drive", hindi: "यूएसबी ड्राइव", category: "stationery", example: "Save the file on a USB drive.", hindiExample: "यूएसबी ड्राइव पर फाइल सेव करो।", synonyms: ["flash drive", "pen drive"], antonyms: [] },
      { word: "Tray", hindi: "ट्रे", category: "stationery", example: "Keep papers in the office tray.", hindiExample: "दफ्तर की ट्रे में कागज रखो।", synonyms: ["in-tray", "paper tray"], antonyms: [] },
      { word: "Correction fluid", hindi: "व्हाइटनर / सुधार द्रव", category: "stationery", example: "Use correction fluid to fix the error.", hindiExample: "गलती ठीक करने के लिए व्हाइटनर का उपयोग करें।", synonyms: ["white-out", "liquid paper"], antonyms: [] },
    ],
    practiceQuestions: [
      { id: 1, question: "'Stapler' का हिंदी क्या है?", answer: "स्टेपलर", type: "translation" },
      { id: 2, question: "कागज काटने के लिए कौन सा स्टेशनरी आइटम उपयोग होता है?", answer: "Scissors (कैंची)", type: "usage" },
      { id: 3, question: "सीधी रेखा खींचने के लिए क्या उपयोग करते हैं?", answer: "Ruler (रूलर)", type: "usage" },
      { id: 4, question: "'Correction fluid' को हिंदी में क्या कहते हैं?", answer: "व्हाइटनर", type: "translation" },
      { id: 5, question: "वृत्त बनाने के लिए कौन सा उपकरण चाहिए?", answer: "Compass (परकार)", type: "usage" },
    ],
    testQuestions: [
      { id: 1, question: "What is used to draw circles?", options: ["Ruler", "Compass", "Protractor", "Set square"], answer: "Compass", type: "mcq" },
      { id: 2, question: "'Eraser' is used to:", options: ["Write", "Cut paper", "Remove pencil marks", "Measure angles"], answer: "Remove pencil marks", type: "mcq" },
      { id: 3, question: "Hindi meaning of 'Envelope' is:", options: ["लिफाफा", "डाक टिकट", "फाइल", "ट्रे"], answer: "लिफाफा", type: "mcq" },
      { id: 4, question: "Which is used to measure angles?", options: ["Ruler", "Compass", "Protractor", "Set square"], answer: "Protractor", type: "mcq" },
      { id: 5, question: "'Highlighter' is used for:", options: ["Cutting", "Drawing circles", "Marking important text", "Measuring"], answer: "Marking important text", type: "mcq" },
      { id: 6, question: "What is 'श्यामपट्ट' in English?", options: ["Whiteboard", "Blackboard", "Notice board", "Chart paper"], answer: "Blackboard", type: "mcq" },
      { id: 7, question: "A 'Paper clip' is used to:", options: ["Cut paper", "Hold papers together", "Write", "Erase"], answer: "Hold papers together", type: "mcq" },
      { id: 8, question: "'Dustbin' in Hindi is:", options: ["स्टीकर", "ट्रे", "कूड़ेदान", "कैलेंडर"], answer: "कूड़ेदान", type: "mcq" },
      { id: 9, question: "Which stationery item stores digital files?", options: ["Stapler", "USB drive", "Ruler", "Compass"], answer: "USB drive", type: "mcq" },
      { id: 10, question: "'Correction fluid' removes:", options: ["Pencil marks", "Ink mistakes", "Dust", "Files"], answer: "Ink mistakes", type: "mcq" },
      { id: 11, question: "A 'Diary' is used to:", options: ["Measure length", "Write daily events", "Store files", "Scan documents"], answer: "Write daily events", type: "mcq" },
      { id: 12, question: "What is 'परकार' in English?", options: ["Ruler", "Protractor", "Compass", "Set square"], answer: "Compass", type: "mcq" },
      { id: 13, question: "'Blotting paper' is used to:", options: ["Write notes", "Absorb ink", "Draw lines", "Measure angles"], answer: "Absorb ink", type: "mcq" },
      { id: 14, question: "Hindi for 'Stamp' (postal) is:", options: ["टेप", "डाक टिकट", "लेबल", "स्टीकर"], answer: "डाक टिकट", type: "mcq" },
      { id: 15, question: "A 'Scanner' is used to:", options: ["Print documents", "Digitize documents", "Write emails", "Cut paper"], answer: "Digitize documents", type: "mcq" },
      { id: 16, question: "Which item is used to pin papers on a notice board?", options: ["Rubber band", "Paper clip", "Drawing pin", "Staple"], answer: "Drawing pin", type: "mcq" },
      { id: 17, question: "What is 'सोखता कागज' in English?", options: ["Graph paper", "Blotting paper", "Chart paper", "Tissue paper"], answer: "Blotting paper", type: "mcq" },
      { id: 18, question: "A 'Projector' is used to:", options: ["Print", "Scan", "Display presentations", "Store files"], answer: "Display presentations", type: "mcq" },
      { id: 19, question: "'Rubber band' is used to:", options: ["Write", "Cut", "Tie bundles", "Measure"], answer: "Tie bundles", type: "mcq" },
      { id: 20, question: "What is 'Punching machine' used for?", options: ["Making holes in paper", "Cutting paper", "Binding pages", "Drawing"], answer: "Making holes in paper", type: "mcq" },
      { id: 21, question: "A 'Binder' helps to:", options: ["Write notes", "Keep notes organized", "Calculate numbers", "Draw graphs"], answer: "Keep notes organized", type: "mcq" },
      { id: 22, question: "'Ink' in Hindi is:", options: ["रबड़", "स्याही", "गोंद", "टेप"], answer: "स्याही", type: "mcq" },
      { id: 23, question: "Which device makes copies of documents?", options: ["Scanner", "Printer", "Photocopier", "Projector"], answer: "Photocopier", type: "mcq" },
      { id: 24, question: "A 'Marker' is similar to:", options: ["Pencil", "Eraser", "Felt-tip pen", "Ruler"], answer: "Felt-tip pen", type: "mcq" },
      { id: 25, question: "'Label' is used to:", options: ["Erase", "Identify or name something", "Measure", "Cut"], answer: "Identify or name something", type: "mcq" },
      { id: 26, question: "What is 'स्याही पैड' in English?", options: ["Ink pad", "Blotting paper", "Correction fluid", "Stamp"], answer: "Ink pad", type: "mcq" },
      { id: 27, question: "A 'Mouse pad' is used with:", options: ["Pen", "Keyboard", "Mouse", "Printer"], answer: "Mouse", type: "mcq" },
      { id: 28, question: "'Chalk' is used on a:", options: ["Notebook", "Whiteboard", "Blackboard", "File"], answer: "Blackboard", type: "mcq" },
      { id: 29, question: "A 'Calendar' shows:", options: ["Weights", "Dates and months", "Angles", "Distances"], answer: "Dates and months", type: "mcq" },
      { id: 30, question: "'Duster' in a classroom is used to:", options: ["Draw", "Erase board", "Cut paper", "Bind files"], answer: "Erase board", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 58: FOODS VOCABULARY & TASTES
  // ============================================================
  day58: {
    day: 58,
    title: "Foods Vocabulary & Tastes",
    category: "vocabulary",
    difficulty: "easy",
    duration: 50,
    description: "Food items, cooking terms, restaurant vocabulary, and taste-related words.",
    vocabulary: [
      { word: "Breakfast", hindi: "नाश्ता", category: "meal", example: "I have breakfast at 8 AM.", hindiExample: "मैं सुबह 8 बजे नाश्ता करता हूँ।", synonyms: ["morning meal"], antonyms: ["dinner"] },
      { word: "Lunch", hindi: "दोपहर का खाना", category: "meal", example: "We have lunch together.", hindiExample: "हम साथ दोपहर का खाना खाते हैं।", synonyms: ["midday meal"], antonyms: ["breakfast"] },
      { word: "Dinner", hindi: "रात का खाना", category: "meal", example: "Dinner is ready at 8 PM.", hindiExample: "रात का खाना 8 बजे तैयार है।", synonyms: ["supper", "evening meal"], antonyms: ["breakfast"] },
      { word: "Snack", hindi: "नमकीन / हल्का खाना", category: "meal", example: "I eat a snack in the evening.", hindiExample: "मैं शाम को हल्का खाना खाता हूँ।", synonyms: ["bite", "munchies"], antonyms: [] },
      { word: "Appetizer", hindi: "भूख बढ़ाने वाला व्यंजन", category: "course", example: "Soup is served as an appetizer.", hindiExample: "सूप भूख बढ़ाने के लिए परोसा जाता है।", synonyms: ["starter", "hors d'oeuvre"], antonyms: ["dessert"] },
      { word: "Main course", hindi: "मुख्य व्यंजन", category: "course", example: "Rice is the main course today.", hindiExample: "आज चावल मुख्य व्यंजन है।", synonyms: ["entree", "main dish"], antonyms: ["appetizer"] },
      { word: "Dessert", hindi: "मिठाई / मीठा व्यंजन", category: "course", example: "Ice cream is my favourite dessert.", hindiExample: "आइसक्रीम मेरा पसंदीदा मीठा व्यंजन है।", synonyms: ["sweet", "pudding"], antonyms: ["appetizer"] },
      { word: "Sweet", hindi: "मीठा", category: "taste", example: "Mangoes are very sweet.", hindiExample: "आम बहुत मीठे होते हैं।", synonyms: ["sugary", "honeyed"], antonyms: ["bitter", "sour"] },
      { word: "Sour", hindi: "खट्टा", category: "taste", example: "Lemons are sour in taste.", hindiExample: "नींबू स्वाद में खट्टे होते हैं।", synonyms: ["tart", "acidic"], antonyms: ["sweet"] },
      { word: "Spicy", hindi: "मसालेदार", category: "taste", example: "Indian food is often spicy.", hindiExample: "भारतीय खाना अक्सर मसालेदार होता है।", synonyms: ["hot", "pungent"], antonyms: ["mild", "bland"] },
      { word: "Bitter", hindi: "कड़वा", category: "taste", example: "Medicine tastes bitter.", hindiExample: "दवाई कड़वी लगती है।", synonyms: ["acrid", "harsh"], antonyms: ["sweet"] },
      { word: "Salty", hindi: "नमकीन", category: "taste", example: "The soup is too salty.", hindiExample: "सूप बहुत नमकीन है।", synonyms: ["briny", "saline"], antonyms: ["sweet", "fresh"] },
      { word: "Bland", hindi: "बेस्वाद", category: "taste", example: "The food was bland without spices.", hindiExample: "बिना मसाले के खाना बेस्वाद था।", synonyms: ["tasteless", "insipid"], antonyms: ["spicy", "flavourful"] },
      { word: "Tangy", hindi: "चटपटा", category: "taste", example: "Tamarind gives a tangy taste.", hindiExample: "इमली चटपटा स्वाद देती है।", synonyms: ["tart", "piquant"], antonyms: ["bland"] },
      { word: "Crispy", hindi: "करकरा / कुरकुरा", category: "texture", example: "The chips are crispy.", hindiExample: "चिप्स कुरकुरे हैं।", synonyms: ["crunchy", "brittle"], antonyms: ["soft", "soggy"] },
      { word: "Tender", hindi: "मुलायम / नरम", category: "texture", example: "The chicken is very tender.", hindiExample: "चिकन बहुत नरम है।", synonyms: ["soft", "juicy"], antonyms: ["tough", "hard"] },
      { word: "Boil", hindi: "उबालना", category: "cooking", example: "Boil water for tea.", hindiExample: "चाय के लिए पानी उबालो।", synonyms: ["simmer", "heat"], antonyms: ["freeze", "cool"] },
      { word: "Fry", hindi: "तलना", category: "cooking", example: "Fry the onions in oil.", hindiExample: "तेल में प्याज तलो।", synonyms: ["sauté", "deep-fry"], antonyms: ["boil", "bake"] },
      { word: "Bake", hindi: "पकाना (ओवन में)", category: "cooking", example: "She bakes cakes on Sundays.", hindiExample: "वह रविवार को केक पकाती है।", synonyms: ["roast", "cook"], antonyms: ["freeze"] },
      { word: "Roast", hindi: "भूनना", category: "cooking", example: "Roast the chicken for an hour.", hindiExample: "एक घंटे के लिए चिकन भूनो।", synonyms: ["grill", "bake"], antonyms: ["boil"] },
      { word: "Grill", hindi: "ग्रिल करना", category: "cooking", example: "Grill the vegetables on high heat.", hindiExample: "तेज आग पर सब्जियाँ ग्रिल करो।", synonyms: ["broil", "barbecue"], antonyms: ["boil"] },
      { word: "Steam", hindi: "भाप में पकाना", category: "cooking", example: "Steam the dumplings for 10 minutes.", hindiExample: "10 मिनट के लिए मोमो भाप में पकाओ।", synonyms: ["poach"], antonyms: ["fry"] },
      { word: "Chop", hindi: "काटना", category: "cooking", example: "Chop the vegetables finely.", hindiExample: "सब्जियाँ बारीक काटो।", synonyms: ["cut", "dice", "mince"], antonyms: [] },
      { word: "Recipe", hindi: "व्यंजन विधि", category: "cooking", example: "Follow the recipe carefully.", hindiExample: "व्यंजन विधि ध्यान से पालन करो।", synonyms: ["instructions", "formula"], antonyms: [] },
      { word: "Ingredient", hindi: "सामग्री", category: "cooking", example: "Flour is a key ingredient.", hindiExample: "आटा मुख्य सामग्री है।", synonyms: ["component", "element"], antonyms: [] },
      { word: "Cuisine", hindi: "खान-पान शैली", category: "food", example: "Indian cuisine is diverse.", hindiExample: "भारतीय खान-पान शैली विविध है।", synonyms: ["cookery", "food culture"], antonyms: [] },
      { word: "Menu", hindi: "मेनू / खाद्य सूची", category: "restaurant", example: "Ask the waiter for the menu.", hindiExample: "वेटर से मेनू माँगो।", synonyms: ["bill of fare"], antonyms: [] },
      { word: "Waiter", hindi: "वेटर / परिचारक", category: "restaurant", example: "The waiter took our order.", hindiExample: "वेटर ने हमारा ऑर्डर लिया।", synonyms: ["server", "attendant"], antonyms: [] },
      { word: "Order", hindi: "ऑर्डर देना", category: "restaurant", example: "I will order a dal makhani.", hindiExample: "मैं दाल मखनी का ऑर्डर दूँगा।", synonyms: ["request", "command"], antonyms: [] },
      { word: "Bill", hindi: "बिल", category: "restaurant", example: "Please bring the bill.", hindiExample: "कृपया बिल लाइए।", synonyms: ["check", "invoice"], antonyms: [] },
      { word: "Nutrition", hindi: "पोषण", category: "health", example: "Good nutrition keeps you healthy.", hindiExample: "अच्छा पोषण आपको स्वस्थ रखता है।", synonyms: ["nourishment", "diet"], antonyms: [] },
      { word: "Calorie", hindi: "कैलोरी", category: "health", example: "Avoid high-calorie foods.", hindiExample: "उच्च कैलोरी वाले खाद्य पदार्थों से बचें।", synonyms: ["energy unit"], antonyms: [] },
      { word: "Vegetarian", hindi: "शाकाहारी", category: "diet", example: "She is a strict vegetarian.", hindiExample: "वह सख्त शाकाहारी है।", synonyms: ["plant-based eater"], antonyms: ["non-vegetarian"] },
      { word: "Organic", hindi: "जैविक", category: "food", example: "Buy organic vegetables for better health.", hindiExample: "बेहतर स्वास्थ्य के लिए जैविक सब्जियाँ खरीदो।", synonyms: ["natural", "chemical-free"], antonyms: ["inorganic", "processed"] },
      { word: "Feast", hindi: "दावत", category: "food", example: "There was a feast at the wedding.", hindiExample: "शादी में दावत थी।", synonyms: ["banquet", "spread"], antonyms: ["fast", "starvation"] },
      { word: "Fast", hindi: "उपवास", category: "food", example: "She fasts on Mondays.", hindiExample: "वह सोमवार को उपवास करती है।", synonyms: ["abstain", "diet"], antonyms: ["feast", "eat"] },
      { word: "Aroma", hindi: "सुगंध / खुशबू", category: "food", example: "The aroma of fresh bread is wonderful.", hindiExample: "ताजी रोटी की खुशबू बहुत अच्छी है।", synonyms: ["fragrance", "scent"], antonyms: ["stench", "odor"] },
      { word: "Flavour", hindi: "स्वाद / खुशबू", category: "taste", example: "This dish has a rich flavour.", hindiExample: "इस व्यंजन का स्वाद समृद्ध है।", synonyms: ["taste", "savour"], antonyms: ["blandness"] },
      { word: "Garnish", hindi: "सजावट (खाने की)", category: "cooking", example: "Garnish the dish with coriander.", hindiExample: "धनिये से व्यंजन सजाओ।", synonyms: ["decorate", "embellish"], antonyms: [] },
      { word: "Marinate", hindi: "मैरिनेट करना", category: "cooking", example: "Marinate the chicken overnight.", hindiExample: "रात भर चिकन मैरिनेट करो।", synonyms: ["soak", "steep"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Appetizer' is served:", options: ["After main course", "Before main course", "As dessert", "With drinks"], answer: "Before main course", type: "mcq" },
      { id: 2, question: "Which taste describes lemon?", options: ["Sweet", "Sour", "Bitter", "Salty"], answer: "Sour", type: "mcq" },
      { id: 3, question: "'Bake' means cooking in:", options: ["Oil", "Water", "Oven", "Steam"], answer: "Oven", type: "mcq" },
      { id: 4, question: "Hindi of 'Recipe' is:", options: ["व्यंजन विधि", "सामग्री", "मेनू", "स्वाद"], answer: "व्यंजन विधि", type: "mcq" },
      { id: 5, question: "'Bland' food has:", options: ["Too much spice", "No taste", "Sweet taste", "Sour taste"], answer: "No taste", type: "mcq" },
      { id: 6, question: "A 'Vegetarian' person eats:", options: ["Meat", "Fish", "Only plant-based food", "Eggs"], answer: "Only plant-based food", type: "mcq" },
      { id: 7, question: "'Aroma' means:", options: ["कड़वापन", "खुशबू", "नमक", "रंग"], answer: "खुशबू", type: "mcq" },
      { id: 8, question: "To 'Marinate' means:", options: ["To fry", "To soak in spices", "To boil", "To bake"], answer: "To soak in spices", type: "mcq" },
      { id: 9, question: "'Feast' is the opposite of:", options: ["Menu", "Fast", "Cuisine", "Order"], answer: "Fast", type: "mcq" },
      { id: 10, question: "'Garnish' is used to:", options: ["Cook faster", "Decorate food", "Add salt", "Remove bitterness"], answer: "Decorate food", type: "mcq" },
      { id: 11, question: "Which cooking method uses steam?", options: ["Frying", "Grilling", "Steaming", "Baking"], answer: "Steaming", type: "mcq" },
      { id: 12, question: "'Tender' food is:", options: ["Crispy", "Hard", "Soft and juicy", "Burnt"], answer: "Soft and juicy", type: "mcq" },
      { id: 13, question: "Hindi for 'Dessert' is:", options: ["नाश्ता", "मुख्य व्यंजन", "मिठाई", "सूप"], answer: "मिठाई", type: "mcq" },
      { id: 14, question: "'Cuisine' refers to:", options: ["A single dish", "A cooking style or tradition", "A restaurant", "A recipe"], answer: "A cooking style or tradition", type: "mcq" },
      { id: 15, question: "'Organic' food is:", options: ["Processed", "Chemical-free / natural", "Synthetic", "Frozen"], answer: "Chemical-free / natural", type: "mcq" },
      { id: 16, question: "In a restaurant, you give your 'Order' to:", options: ["Chef", "Cashier", "Waiter", "Manager"], answer: "Waiter", type: "mcq" },
      { id: 17, question: "To 'Grill' means:", options: ["Boil in water", "Cook on direct heat/flame", "Cook in oven", "Steam"], answer: "Cook on direct heat/flame", type: "mcq" },
      { id: 18, question: "'Calorie' is a unit of:", options: ["Weight", "Temperature", "Energy in food", "Taste"], answer: "Energy in food", type: "mcq" },
      { id: 19, question: "Synonyms of 'Spicy' include:", options: ["Bland", "Mild", "Hot and pungent", "Sweet"], answer: "Hot and pungent", type: "mcq" },
      { id: 20, question: "'Chop' means:", options: ["To boil", "To cut into pieces", "To marinate", "To garnish"], answer: "To cut into pieces", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 59: RELATION & WEATHER VOCABULARY
  // ============================================================
  day59: {
    day: 59,
    title: "Relation & Weather Vocabulary",
    category: "vocabulary",
    difficulty: "easy",
    duration: 50,
    description: "Family relations and weather-related vocabulary with Hindi meanings.",
    vocabulary: [
      // Family Relations
      { word: "Grandfather", hindi: "दादा / नाना", category: "relation", example: "My grandfather is 75 years old.", hindiExample: "मेरे दादाजी 75 साल के हैं।", synonyms: ["grandpa"], antonyms: [] },
      { word: "Grandmother", hindi: "दादी / नानी", category: "relation", example: "My grandmother cooks delicious food.", hindiExample: "मेरी दादी स्वादिष्ट खाना बनाती हैं।", synonyms: ["grandma", "granny"], antonyms: [] },
      { word: "Father", hindi: "पिता", category: "relation", example: "My father goes to office daily.", hindiExample: "मेरे पिता रोज दफ्तर जाते हैं।", synonyms: ["dad", "papa"], antonyms: ["mother"] },
      { word: "Mother", hindi: "माँ", category: "relation", example: "My mother is a teacher.", hindiExample: "मेरी माँ शिक्षिका हैं।", synonyms: ["mom", "mama"], antonyms: ["father"] },
      { word: "Brother", hindi: "भाई", category: "relation", example: "I have one elder brother.", hindiExample: "मेरा एक बड़ा भाई है।", synonyms: ["sibling"], antonyms: ["sister"] },
      { word: "Sister", hindi: "बहन", category: "relation", example: "My sister studies in class 10.", hindiExample: "मेरी बहन कक्षा 10 में पढ़ती है।", synonyms: ["sibling"], antonyms: ["brother"] },
      { word: "Uncle", hindi: "चाचा / मामा / फूफा", category: "relation", example: "My uncle lives in Delhi.", hindiExample: "मेरे चाचा दिल्ली में रहते हैं।", synonyms: [], antonyms: ["aunt"] },
      { word: "Aunt", hindi: "चाची / मामी / बुआ", category: "relation", example: "My aunt gifted me a book.", hindiExample: "मेरी बुआ ने मुझे एक किताब दी।", synonyms: [], antonyms: ["uncle"] },
      { word: "Cousin", hindi: "चचेरा/ममेरा भाई-बहन", category: "relation", example: "My cousin is coming from Mumbai.", hindiExample: "मेरा चचेरा भाई मुंबई से आ रहा है।", synonyms: [], antonyms: [] },
      { word: "Nephew", hindi: "भतीजा / भाँजा", category: "relation", example: "My nephew is very naughty.", hindiExample: "मेरा भतीजा बहुत शरारती है।", synonyms: [], antonyms: ["niece"] },
      { word: "Niece", hindi: "भतीजी / भाँजी", category: "relation", example: "My niece loves dancing.", hindiExample: "मेरी भतीजी नाचना पसंद करती है।", synonyms: [], antonyms: ["nephew"] },
      { word: "Husband", hindi: "पति", category: "relation", example: "Her husband works in a bank.", hindiExample: "उसके पति बैंक में काम करते हैं।", synonyms: ["spouse"], antonyms: ["wife"] },
      { word: "Wife", hindi: "पत्नी", category: "relation", example: "His wife is a doctor.", hindiExample: "उनकी पत्नी डॉक्टर हैं।", synonyms: ["spouse"], antonyms: ["husband"] },
      { word: "Son", hindi: "बेटा / पुत्र", category: "relation", example: "Their son is a software engineer.", hindiExample: "उनका बेटा सॉफ्टवेयर इंजीनियर है।", synonyms: [], antonyms: ["daughter"] },
      { word: "Daughter", hindi: "बेटी / पुत्री", category: "relation", example: "Their daughter topped the class.", hindiExample: "उनकी बेटी कक्षा में अव्वल रही।", synonyms: [], antonyms: ["son"] },
      { word: "In-laws", hindi: "ससुराल वाले", category: "relation", example: "She gets along well with her in-laws.", hindiExample: "वह अपने ससुराल वालों के साथ अच्छी तरह रहती है।", synonyms: [], antonyms: [] },
      { word: "Father-in-law", hindi: "ससुर", category: "relation", example: "Her father-in-law is very kind.", hindiExample: "उसके ससुर बहुत दयालु हैं।", synonyms: [], antonyms: ["mother-in-law"] },
      { word: "Mother-in-law", hindi: "सास", category: "relation", example: "Her mother-in-law loves cooking.", hindiExample: "उसकी सास खाना पकाना पसंद करती हैं।", synonyms: [], antonyms: ["father-in-law"] },
      // Weather
      { word: "Sunny", hindi: "धूप वाला", category: "weather", example: "It is a sunny day today.", hindiExample: "आज धूप वाला दिन है।", synonyms: ["bright", "clear"], antonyms: ["cloudy", "rainy"] },
      { word: "Cloudy", hindi: "बादलों से ढका", category: "weather", example: "The sky is cloudy today.", hindiExample: "आज आसमान में बादल छाए हैं।", synonyms: ["overcast", "grey"], antonyms: ["sunny", "clear"] },
      { word: "Rainy", hindi: "बारिश वाला", category: "weather", example: "It is a rainy season.", hindiExample: "बारिश का मौसम है।", synonyms: ["wet", "showery"], antonyms: ["dry", "sunny"] },
      { word: "Windy", hindi: "हवादार", category: "weather", example: "It is very windy outside.", hindiExample: "बाहर बहुत हवा है।", synonyms: ["breezy", "gusty"], antonyms: ["calm", "still"] },
      { word: "Foggy", hindi: "कोहरे वाला", category: "weather", example: "Driving in foggy weather is dangerous.", hindiExample: "कोहरे में गाड़ी चलाना खतरनाक है।", synonyms: ["misty", "hazy"], antonyms: ["clear", "sunny"] },
      { word: "Stormy", hindi: "तूफानी", category: "weather", example: "Stay indoors in stormy weather.", hindiExample: "तूफानी मौसम में घर के अंदर रहो।", synonyms: ["tempestuous", "turbulent"], antonyms: ["calm", "clear"] },
      { word: "Humid", hindi: "नम / उमस भरा", category: "weather", example: "Mumbai is humid in summer.", hindiExample: "गर्मियों में मुंबई उमस भरी होती है।", synonyms: ["damp", "muggy"], antonyms: ["dry", "arid"] },
      { word: "Drought", hindi: "सूखा", category: "weather", example: "The drought destroyed the crops.", hindiExample: "सूखे ने फसलें नष्ट कर दीं।", synonyms: ["dry spell", "aridity"], antonyms: ["flood", "rain"] },
      { word: "Flood", hindi: "बाढ़", category: "weather", example: "Flood damaged many houses.", hindiExample: "बाढ़ ने कई घरों को नुकसान पहुँचाया।", synonyms: ["inundation", "deluge"], antonyms: ["drought"] },
      { word: "Thunder", hindi: "गड़गड़ाहट", category: "weather", example: "Children are scared of thunder.", hindiExample: "बच्चे गड़गड़ाहट से डरते हैं।", synonyms: ["thunderclap"], antonyms: [] },
      { word: "Lightning", hindi: "बिजली / तड़ित", category: "weather", example: "Lightning struck the tree.", hindiExample: "बिजली पेड़ पर गिरी।", synonyms: ["thunderbolt", "flash"], antonyms: [] },
      { word: "Snow", hindi: "बर्फ", category: "weather", example: "Snow covers the mountains in winter.", hindiExample: "सर्दियों में पहाड़ों पर बर्फ होती है।", synonyms: ["snowfall", "sleet"], antonyms: ["rain", "sunshine"] },
      { word: "Hail", hindi: "ओला", category: "weather", example: "Hailstorms damage crops.", hindiExample: "ओलावृष्टि फसलों को नुकसान पहुँचाती है।", synonyms: ["hailstorm", "sleet"], antonyms: [] },
      { word: "Temperature", hindi: "तापमान", category: "weather", example: "The temperature today is 40°C.", hindiExample: "आज का तापमान 40°C है।", synonyms: ["heat level", "warmth"], antonyms: [] },
      { word: "Climate", hindi: "जलवायु", category: "weather", example: "India has a diverse climate.", hindiExample: "भारत की जलवायु विविध है।", synonyms: ["weather pattern"], antonyms: [] },
      { word: "Season", hindi: "ऋतु / मौसम", category: "weather", example: "My favourite season is winter.", hindiExample: "मेरी पसंदीदा ऋतु सर्दी है।", synonyms: ["time of year"], antonyms: [] },
      { word: "Monsoon", hindi: "मानसून", category: "weather", example: "Monsoon arrives in June in India.", hindiExample: "भारत में जून में मानसून आता है।", synonyms: ["rainy season"], antonyms: ["dry season"] },
      { word: "Breeze", hindi: "हल्की हवा", category: "weather", example: "A gentle breeze is blowing.", hindiExample: "हल्की हवा बह रही है।", synonyms: ["gentle wind", "zephyr"], antonyms: ["storm", "gale"] },
      { word: "Cyclone", hindi: "चक्रवात", category: "weather", example: "A cyclone hit the coastal area.", hindiExample: "चक्रवात ने तटीय क्षेत्र को प्रभावित किया।", synonyms: ["hurricane", "typhoon"], antonyms: [] },
      { word: "Rainbow", hindi: "इंद्रधनुष", category: "weather", example: "A rainbow appeared after the rain.", hindiExample: "बारिश के बाद इंद्रधनुष दिखा।", synonyms: [], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Nephew' means:", options: ["भतीजा", "भतीजी", "भाई", "चाचा"], answer: "भतीजा", type: "mcq" },
      { id: 2, question: "Father's sister is called:", options: ["Aunt", "Niece", "Cousin", "Sister-in-law"], answer: "Aunt", type: "mcq" },
      { id: 3, question: "Mother's brother is called:", options: ["Paternal uncle", "Maternal uncle", "Father-in-law", "Cousin"], answer: "Maternal uncle", type: "mcq" },
      { id: 4, question: "'Foggy' weather means:", options: ["Sunny", "Cloudy", "Misty/hazy", "Rainy"], answer: "Misty/hazy", type: "mcq" },
      { id: 5, question: "Hindi for 'Monsoon' is:", options: ["बाढ़", "सूखा", "मानसून", "तूफान"], answer: "मानसून", type: "mcq" },
      { id: 6, question: "Opposite of 'Drought' is:", options: ["Storm", "Flood", "Snow", "Rainbow"], answer: "Flood", type: "mcq" },
      { id: 7, question: "'Lightning' appears during:", options: ["Clear sky", "Thunderstorm", "Fog", "Hail"], answer: "Thunderstorm", type: "mcq" },
      { id: 8, question: "Mother's mother is called:", options: ["Paternal grandmother", "Maternal grandmother", "Aunt", "Mother-in-law"], answer: "Maternal grandmother", type: "mcq" },
      { id: 9, question: "'Humid' weather means:", options: ["Dry", "Very cold", "Damp/muggy", "Windy"], answer: "Damp/muggy", type: "mcq" },
      { id: 10, question: "Hindi for 'Cyclone' is:", options: ["भूकंप", "चक्रवात", "बाढ़", "सूखा"], answer: "चक्रवात", type: "mcq" },
      { id: 11, question: "Wife's parents are called:", options: ["Cousins", "In-laws", "Siblings", "Relatives"], answer: "In-laws", type: "mcq" },
      { id: 12, question: "'Rainbow' appears after:", options: ["Snow", "Hail", "Rain", "Drought"], answer: "Rain", type: "mcq" },
      { id: 13, question: "Brother's daughter is called:", options: ["Niece", "Nephew", "Cousin", "Sister"], answer: "Niece", type: "mcq" },
      { id: 14, question: "'Temperature' is measured in:", options: ["Litres", "Kilograms", "Celsius/Fahrenheit", "Metres"], answer: "Celsius/Fahrenheit", type: "mcq" },
      { id: 15, question: "'Breeze' is a:", options: ["Heavy storm", "Gentle wind", "Heavy rain", "Snowfall"], answer: "Gentle wind", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 60: PROFESSIONS & OCCUPATIONS VOCABULARY
  // ============================================================
  day60: {
    day: 60,
    title: "Professions & Occupations Vocabulary",
    category: "vocabulary",
    difficulty: "easy",
    duration: 50,
    description: "Names of professions, occupations and their roles with Hindi meanings.",
    vocabulary: [
      { word: "Doctor", hindi: "डॉक्टर / चिकित्सक", category: "profession", example: "The doctor examined the patient.", hindiExample: "डॉक्टर ने मरीज की जाँच की।", synonyms: ["physician", "medic"], antonyms: [] },
      { word: "Engineer", hindi: "इंजीनियर", category: "profession", example: "He is a civil engineer.", hindiExample: "वह एक सिविल इंजीनियर है।", synonyms: ["technician"], antonyms: [] },
      { word: "Teacher", hindi: "शिक्षक / शिक्षिका", category: "profession", example: "The teacher explained the lesson.", hindiExample: "शिक्षक ने पाठ समझाया।", synonyms: ["instructor", "educator"], antonyms: ["student"] },
      { word: "Lawyer", hindi: "वकील", category: "profession", example: "The lawyer defended his client.", hindiExample: "वकील ने अपने मुवक्किल का बचाव किया।", synonyms: ["attorney", "advocate"], antonyms: [] },
      { word: "Nurse", hindi: "नर्स", category: "profession", example: "The nurse gave the injection.", hindiExample: "नर्स ने इंजेक्शन दिया।", synonyms: ["healthcare worker"], antonyms: [] },
      { word: "Accountant", hindi: "लेखाकार / अकाउंटेंट", category: "profession", example: "The accountant prepared the balance sheet.", hindiExample: "अकाउंटेंट ने बैलेंस शीट तैयार की।", synonyms: ["bookkeeper", "auditor"], antonyms: [] },
      { word: "Architect", hindi: "वास्तुकार", category: "profession", example: "The architect designed the building.", hindiExample: "वास्तुकार ने इमारत डिजाइन की।", synonyms: ["designer", "planner"], antonyms: [] },
      { word: "Carpenter", hindi: "बढ़ई", category: "profession", example: "The carpenter made new furniture.", hindiExample: "बढ़ई ने नया फर्नीचर बनाया।", synonyms: ["woodworker", "joiner"], antonyms: [] },
      { word: "Electrician", hindi: "बिजली मिस्त्री", category: "profession", example: "The electrician fixed the wiring.", hindiExample: "बिजली मिस्त्री ने तारों को ठीक किया।", synonyms: ["electrical worker"], antonyms: [] },
      { word: "Plumber", hindi: "नल मिस्त्री", category: "profession", example: "The plumber repaired the pipe.", hindiExample: "नल मिस्त्री ने पाइप ठीक की।", synonyms: [], antonyms: [] },
      { word: "Pilot", hindi: "पायलट", category: "profession", example: "The pilot landed the plane safely.", hindiExample: "पायलट ने विमान सुरक्षित उतारा।", synonyms: ["aviator", "flyer"], antonyms: [] },
      { word: "Journalist", hindi: "पत्रकार", category: "profession", example: "The journalist wrote about the incident.", hindiExample: "पत्रकार ने घटना के बारे में लिखा।", synonyms: ["reporter", "correspondent"], antonyms: [] },
      { word: "Pharmacist", hindi: "फार्मासिस्ट / दवाईवाला", category: "profession", example: "The pharmacist gave me the medicine.", hindiExample: "फार्मासिस्ट ने मुझे दवाई दी।", synonyms: ["chemist", "druggist"], antonyms: [] },
      { word: "Dentist", hindi: "दंत चिकित्सक", category: "profession", example: "The dentist checked my teeth.", hindiExample: "दंत चिकित्सक ने मेरे दाँत जाँचे।", synonyms: ["dental surgeon"], antonyms: [] },
      { word: "Veterinarian", hindi: "पशु चिकित्सक", category: "profession", example: "The vet treated the dog.", hindiExample: "पशु चिकित्सक ने कुत्ते का इलाज किया।", synonyms: ["vet", "animal doctor"], antonyms: [] },
      { word: "Scientist", hindi: "वैज्ञानिक", category: "profession", example: "The scientist discovered a new medicine.", hindiExample: "वैज्ञानिक ने एक नई दवाई खोजी।", synonyms: ["researcher", "analyst"], antonyms: [] },
      { word: "Farmer", hindi: "किसान", category: "profession", example: "The farmer grows rice in his field.", hindiExample: "किसान अपने खेत में चावल उगाता है।", synonyms: ["agriculturist", "cultivator"], antonyms: [] },
      { word: "Soldier", hindi: "सैनिक", category: "profession", example: "The soldier guards the border.", hindiExample: "सैनिक सीमा की रक्षा करता है।", synonyms: ["warrior", "trooper"], antonyms: [] },
      { word: "Police officer", hindi: "पुलिस अधिकारी", category: "profession", example: "The police officer caught the thief.", hindiExample: "पुलिस अधिकारी ने चोर को पकड़ा।", synonyms: ["cop", "constable"], antonyms: [] },
      { word: "Chef", hindi: "रसोइया / शेफ", category: "profession", example: "The chef cooked an excellent meal.", hindiExample: "शेफ ने बेहतरीन खाना बनाया।", synonyms: ["cook", "culinarian"], antonyms: [] },
      { word: "Artist", hindi: "कलाकार", category: "profession", example: "The artist painted a beautiful picture.", hindiExample: "कलाकार ने एक सुंदर चित्र बनाया।", synonyms: ["painter", "creative"], antonyms: [] },
      { word: "Musician", hindi: "संगीतकार", category: "profession", example: "The musician played the sitar.", hindiExample: "संगीतकार ने सितार बजाया।", synonyms: ["performer", "instrumentalist"], antonyms: [] },
      { word: "Actor", hindi: "अभिनेता", category: "profession", example: "He is a famous Bollywood actor.", hindiExample: "वह एक प्रसिद्ध बॉलीवुड अभिनेता है।", synonyms: ["performer", "star"], antonyms: [] },
      { word: "Banker", hindi: "बैंकर / बैंक कर्मचारी", category: "profession", example: "The banker approved the loan.", hindiExample: "बैंकर ने ऋण स्वीकृत किया।", synonyms: ["financial officer"], antonyms: [] },
      { word: "Librarian", hindi: "पुस्तकालयाध्यक्ष", category: "profession", example: "The librarian helped me find the book.", hindiExample: "पुस्तकालयाध्यक्ष ने मुझे किताब खोजने में मदद की।", synonyms: [], antonyms: [] },
      { word: "Postman", hindi: "डाकिया", category: "profession", example: "The postman delivered the letter.", hindiExample: "डाकिये ने पत्र दिया।", synonyms: ["mail carrier", "courier"], antonyms: [] },
      { word: "Tailor", hindi: "दर्जी", category: "profession", example: "The tailor stitched my shirt.", hindiExample: "दर्जी ने मेरी कमीज सिली।", synonyms: ["seamstress", "clothier"], antonyms: [] },
      { word: "Cobbler", hindi: "मोची", category: "profession", example: "The cobbler repaired my shoes.", hindiExample: "मोची ने मेरे जूते ठीक किए।", synonyms: ["shoemaker"], antonyms: [] },
      { word: "Barber", hindi: "नाई", category: "profession", example: "The barber cut my hair.", hindiExample: "नाई ने मेरे बाल काटे।", synonyms: ["hairdresser", "stylist"], antonyms: [] },
      { word: "Judge", hindi: "न्यायाधीश", category: "profession", example: "The judge gave the verdict.", hindiExample: "न्यायाधीश ने फैसला सुनाया।", synonyms: ["magistrate", "justice"], antonyms: [] },
      { word: "Politician", hindi: "राजनेता", category: "profession", example: "The politician addressed the rally.", hindiExample: "राजनेता ने रैली को संबोधित किया।", synonyms: ["statesman", "leader"], antonyms: [] },
      { word: "Researcher", hindi: "शोधकर्ता", category: "profession", example: "The researcher published a new paper.", hindiExample: "शोधकर्ता ने एक नया शोधपत्र प्रकाशित किया।", synonyms: ["analyst", "investigator"], antonyms: [] },
      { word: "Psychologist", hindi: "मनोवैज्ञानिक", category: "profession", example: "The psychologist counselled the patient.", hindiExample: "मनोवैज्ञानिक ने रोगी को परामर्श दिया।", synonyms: ["therapist", "counsellor"], antonyms: [] },
      { word: "Astronaut", hindi: "अंतरिक्ष यात्री", category: "profession", example: "The astronaut travelled to the moon.", hindiExample: "अंतरिक्ष यात्री चंद्रमा पर गए।", synonyms: ["cosmonaut", "space traveller"], antonyms: [] },
      { word: "Entrepreneur", hindi: "उद्यमी", category: "profession", example: "She is a successful entrepreneur.", hindiExample: "वह एक सफल उद्यमी है।", synonyms: ["businessman", "innovator"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "Who designs buildings?", options: ["Carpenter", "Architect", "Electrician", "Plumber"], answer: "Architect", type: "mcq" },
      { id: 2, question: "'Journalist' in Hindi is:", options: ["वकील", "पत्रकार", "डॉक्टर", "शिक्षक"], answer: "पत्रकार", type: "mcq" },
      { id: 3, question: "A 'Pharmacist' works in:", options: ["School", "Court", "Pharmacy/Medical store", "Farm"], answer: "Pharmacy/Medical store", type: "mcq" },
      { id: 4, question: "Who treats animals?", options: ["Dentist", "Veterinarian", "Pharmacist", "Surgeon"], answer: "Veterinarian", type: "mcq" },
      { id: 5, question: "'Cobbler' repairs:", options: ["Cars", "Shoes", "Pipes", "Teeth"], answer: "Shoes", type: "mcq" },
      { id: 6, question: "'Entrepreneur' means:", options: ["सैनिक", "उद्यमी", "पुस्तकालयाध्यक्ष", "डाकिया"], answer: "उद्यमी", type: "mcq" },
      { id: 7, question: "A 'Librarian' manages:", options: ["Hospital", "Library", "Bank", "School"], answer: "Library", type: "mcq" },
      { id: 8, question: "Who delivers letters?", options: ["Barber", "Tailor", "Postman", "Cobbler"], answer: "Postman", type: "mcq" },
      { id: 9, question: "'Judge' in Hindi is:", options: ["वकील", "न्यायाधीश", "राजनेता", "पुलिस"], answer: "न्यायाधीश", type: "mcq" },
      { id: 10, question: "A 'Psychologist' helps with:", options: ["Physical health", "Mental health", "Legal matters", "Financial issues"], answer: "Mental health", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 61: BUILDINGS, WORMS & INSECTS VOCABULARY
  // ============================================================
  day61: {
    day: 61,
    title: "Buildings, Worms & Insects Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 50,
    description: "Vocabulary about types of buildings and names of worms and insects.",
    vocabulary: [
      // Buildings
      { word: "Bungalow", hindi: "बंगला", category: "building", example: "They live in a beautiful bungalow.", hindiExample: "वे एक सुंदर बंगले में रहते हैं।", synonyms: ["cottage", "villa"], antonyms: [] },
      { word: "Apartment", hindi: "अपार्टमेंट / फ्लैट", category: "building", example: "I live in a 2-BHK apartment.", hindiExample: "मैं 2-BHK अपार्टमेंट में रहता हूँ।", synonyms: ["flat", "unit"], antonyms: [] },
      { word: "Skyscraper", hindi: "गगनचुंबी इमारत", category: "building", example: "New York has many skyscrapers.", hindiExample: "न्यूयॉर्क में कई গগনचुंबी इमारतें हैं।", synonyms: ["high-rise", "tower block"], antonyms: ["hut", "cottage"] },
      { word: "Cottage", hindi: "छोटा मकान / झोपड़ी", category: "building", example: "They have a cottage in the hills.", hindiExample: "उनके पास पहाड़ों में एक छोटा मकान है।", synonyms: ["hut", "cabin"], antonyms: ["skyscraper"] },
      { word: "Palace", hindi: "महल", category: "building", example: "The king lived in a magnificent palace.", hindiExample: "राजा एक शानदार महल में रहते थे।", synonyms: ["mansion", "castle"], antonyms: ["hut"] },
      { word: "Temple", hindi: "मंदिर", category: "building", example: "People visit the temple every morning.", hindiExample: "लोग हर सुबह मंदिर जाते हैं।", synonyms: ["shrine", "place of worship"], antonyms: [] },
      { word: "Mosque", hindi: "मस्जिद", category: "building", example: "The mosque was built 200 years ago.", hindiExample: "मस्जिद 200 साल पहले बनी थी।", synonyms: ["masjid"], antonyms: [] },
      { word: "Church", hindi: "चर्च / गिरजाघर", category: "building", example: "They got married in the church.", hindiExample: "उनकी शादी चर्च में हुई।", synonyms: ["chapel", "cathedral"], antonyms: [] },
      { word: "Hospital", hindi: "अस्पताल", category: "building", example: "The hospital has modern facilities.", hindiExample: "अस्पताल में आधुनिक सुविधाएँ हैं।", synonyms: ["medical centre", "clinic"], antonyms: [] },
      { word: "Library", hindi: "पुस्तकालय", category: "building", example: "She studies in the library every evening.", hindiExample: "वह हर शाम पुस्तकालय में पढ़ती है।", synonyms: ["reading room", "archive"], antonyms: [] },
      { word: "Stadium", hindi: "स्टेडियम", category: "building", example: "The cricket match was held in the stadium.", hindiExample: "स्टेडियम में क्रिकेट मैच हुआ।", synonyms: ["arena", "ground"], antonyms: [] },
      { word: "Laboratory", hindi: "प्रयोगशाला", category: "building", example: "Scientists work in a laboratory.", hindiExample: "वैज्ञानिक प्रयोगशाला में काम करते हैं।", synonyms: ["lab", "research facility"], antonyms: [] },
      { word: "Warehouse", hindi: "गोदाम", category: "building", example: "Goods are stored in the warehouse.", hindiExample: "गोदाम में सामान रखा जाता है।", synonyms: ["godown", "storage facility"], antonyms: [] },
      { word: "Museum", hindi: "संग्रहालय", category: "building", example: "The museum displays ancient artifacts.", hindiExample: "संग्रहालय में प्राचीन वस्तुएँ प्रदर्शित हैं।", synonyms: ["gallery", "exhibition hall"], antonyms: [] },
      { word: "Orphanage", hindi: "अनाथालय", category: "building", example: "She volunteers at the orphanage.", hindiExample: "वह अनाथालय में स्वयंसेवा करती है।", synonyms: ["children's home"], antonyms: [] },
      // Insects & Worms
      { word: "Ant", hindi: "चींटी", category: "insect", example: "Ants are very hardworking insects.", hindiExample: "चींटियाँ बहुत मेहनती कीड़े हैं।", synonyms: [], antonyms: [] },
      { word: "Bee", hindi: "मधुमक्खी", category: "insect", example: "Bees make honey.", hindiExample: "मधुमक्खियाँ शहद बनाती हैं।", synonyms: ["honeybee"], antonyms: [] },
      { word: "Butterfly", hindi: "तितली", category: "insect", example: "A butterfly sat on the flower.", hindiExample: "फूल पर तितली बैठी।", synonyms: [], antonyms: [] },
      { word: "Mosquito", hindi: "मच्छर", category: "insect", example: "Mosquitoes spread malaria.", hindiExample: "मच्छर मलेरिया फैलाते हैं।", synonyms: [], antonyms: [] },
      { word: "Cockroach", hindi: "तिलचट्टा", category: "insect", example: "A cockroach was found in the kitchen.", hindiExample: "रसोई में एक तिलचट्टा मिला।", synonyms: ["roach"], antonyms: [] },
      { word: "Fly", hindi: "मक्खी", category: "insect", example: "Flies spread diseases.", hindiExample: "मक्खियाँ बीमारियाँ फैलाती हैं।", synonyms: [], antonyms: [] },
      { word: "Spider", hindi: "मकड़ी", category: "insect", example: "A spider spun its web.", hindiExample: "मकड़ी ने अपना जाल बुना।", synonyms: ["arachnid"], antonyms: [] },
      { word: "Earthworm", hindi: "केंचुआ", category: "worm", example: "Earthworms help make the soil fertile.", hindiExample: "केंचुए मिट्टी को उपजाऊ बनाते हैं।", synonyms: ["nightcrawler"], antonyms: [] },
      { word: "Caterpillar", hindi: "इल्ली / सुँड़ी", category: "insect", example: "A caterpillar becomes a butterfly.", hindiExample: "इल्ली तितली बन जाती है।", synonyms: ["larva"], antonyms: [] },
      { word: "Grasshopper", hindi: "टिड्डा", category: "insect", example: "Grasshoppers damage crops.", hindiExample: "टिड्डे फसलों को नुकसान पहुँचाते हैं।", synonyms: ["locust"], antonyms: [] },
      { word: "Firefly", hindi: "जुगनू", category: "insect", example: "Fireflies glow at night.", hindiExample: "जुगनू रात को चमकते हैं।", synonyms: ["glowworm", "lightning bug"], antonyms: [] },
      { word: "Beetle", hindi: "भृंग", category: "insect", example: "A beetle crawled on the wall.", hindiExample: "दीवार पर एक भृंग रेंगा।", synonyms: [], antonyms: [] },
      { word: "Termite", hindi: "दीमक", category: "insect", example: "Termites damaged the wooden furniture.", hindiExample: "दीमक ने लकड़ी के फर्नीचर को नुकसान पहुँचाया।", synonyms: ["white ant"], antonyms: [] },
      { word: "Louse", hindi: "जूँ", category: "insect", example: "Lice live in dirty hair.", hindiExample: "जूँ गंदे बालों में रहती है।", synonyms: ["lice (plural)"], antonyms: [] },
      { word: "Dragonfly", hindi: "व्याधपतंग / डार्नफ्लाई", category: "insect", example: "Dragonflies are found near water.", hindiExample: "व्याधपतंग पानी के पास मिलते हैं।", synonyms: [], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "Which insect makes honey?", options: ["Ant", "Fly", "Bee", "Mosquito"], answer: "Bee", type: "mcq" },
      { id: 2, question: "'Termite' in Hindi is:", options: ["जूँ", "दीमक", "तिलचट्टा", "मच्छर"], answer: "दीमक", type: "mcq" },
      { id: 3, question: "A 'Caterpillar' grows into:", options: ["Moth", "Butterfly", "Bee", "Dragonfly"], answer: "Butterfly", type: "mcq" },
      { id: 4, question: "'Earthworm' helps:", options: ["Spread diseases", "Damage crops", "Make soil fertile", "Build webs"], answer: "Make soil fertile", type: "mcq" },
      { id: 5, question: "Which building stores goods?", options: ["Museum", "Library", "Warehouse", "Orphanage"], answer: "Warehouse", type: "mcq" },
      { id: 6, question: "'Skyscraper' is a:", options: ["Small cottage", "Very tall building", "Religious place", "Storage place"], answer: "Very tall building", type: "mcq" },
      { id: 7, question: "'Firefly' glows:", options: ["During day", "During rain", "At night", "In winter"], answer: "At night", type: "mcq" },
      { id: 8, question: "Hindi for 'Laboratory' is:", options: ["संग्रहालय", "प्रयोगशाला", "गोदाम", "पुस्तकालय"], answer: "प्रयोगशाला", type: "mcq" },
      { id: 9, question: "'Mosquitoes' spread:", options: ["Honey", "Malaria", "Silk", "Wax"], answer: "Malaria", type: "mcq" },
      { id: 10, question: "An 'Orphanage' is a home for:", options: ["Old people", "Animals", "Children without parents", "Sick people"], answer: "Children without parents", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 62: FLOWERS & FRUITS VOCABULARY
  // ============================================================
  day62: {
    day: 62,
    title: "Flowers & Fruits Vocabulary",
    category: "vocabulary",
    difficulty: "easy",
    duration: 45,
    description: "Names of flowers and fruits in English with Hindi meanings and descriptions.",
    vocabulary: [
      // Flowers
      { word: "Rose", hindi: "गुलाब", category: "flower", example: "A red rose symbolizes love.", hindiExample: "लाल गुलाब प्रेम का प्रतीक है।", synonyms: [], antonyms: [] },
      { word: "Lotus", hindi: "कमल", category: "flower", example: "Lotus is the national flower of India.", hindiExample: "कमल भारत का राष्ट्रीय फूल है।", synonyms: ["water lily"], antonyms: [] },
      { word: "Jasmine", hindi: "चमेली", category: "flower", example: "Jasmine has a sweet fragrance.", hindiExample: "चमेली की खुशबू मीठी होती है।", synonyms: ["mogra"], antonyms: [] },
      { word: "Marigold", hindi: "गेंदा", category: "flower", example: "Marigold is used in Indian festivals.", hindiExample: "भारतीय त्योहारों में गेंदे का उपयोग होता है।", synonyms: [], antonyms: [] },
      { word: "Sunflower", hindi: "सूरजमुखी", category: "flower", example: "Sunflowers turn towards the sun.", hindiExample: "सूरजमुखी सूर्य की ओर मुड़ते हैं।", synonyms: [], antonyms: [] },
      { word: "Lily", hindi: "लिली", category: "flower", example: "White lilies represent purity.", hindiExample: "सफेद लिली शुद्धता का प्रतीक है।", synonyms: [], antonyms: [] },
      { word: "Tulip", hindi: "ट्यूलिप", category: "flower", example: "Tulips bloom in spring.", hindiExample: "वसंत में ट्यूलिप खिलते हैं।", synonyms: [], antonyms: [] },
      { word: "Orchid", hindi: "आर्किड", category: "flower", example: "Orchids are exotic flowers.", hindiExample: "आर्किड विदेशी फूल हैं।", synonyms: [], antonyms: [] },
      { word: "Hibiscus", hindi: "गुड़हल", category: "flower", example: "Hibiscus is used in herbal tea.", hindiExample: "गुड़हल का उपयोग हर्बल चाय में होता है।", synonyms: ["China rose"], antonyms: [] },
      { word: "Lavender", hindi: "लैवेंडर", category: "flower", example: "Lavender has a calming fragrance.", hindiExample: "लैवेंडर की खुशबू शांत करने वाली होती है।", synonyms: [], antonyms: [] },
      { word: "Daisy", hindi: "डेजी", category: "flower", example: "Daisies grow in the meadow.", hindiExample: "घास के मैदान में डेजी उगती हैं।", synonyms: [], antonyms: [] },
      { word: "Carnation", hindi: "कार्नेशन / शेफालिका", category: "flower", example: "Carnations are popular in bouquets.", hindiExample: "कार्नेशन गुलदस्तों में लोकप्रिय हैं।", synonyms: [], antonyms: [] },
      // Fruits
      { word: "Mango", hindi: "आम", category: "fruit", example: "Mango is the king of fruits.", hindiExample: "आम फलों का राजा है।", synonyms: [], antonyms: [] },
      { word: "Apple", hindi: "सेब", category: "fruit", example: "An apple a day keeps the doctor away.", hindiExample: "रोज एक सेब खाने से डॉक्टर दूर रहता है।", synonyms: [], antonyms: [] },
      { word: "Banana", hindi: "केला", category: "fruit", example: "Banana gives instant energy.", hindiExample: "केला तुरंत ऊर्जा देता है।", synonyms: [], antonyms: [] },
      { word: "Grape", hindi: "अंगूर", category: "fruit", example: "Grapes are used to make wine.", hindiExample: "अंगूर से शराब बनती है।", synonyms: [], antonyms: [] },
      { word: "Pineapple", hindi: "अनानास", category: "fruit", example: "Pineapple has a tangy taste.", hindiExample: "अनानास का स्वाद चटपटा होता है।", synonyms: [], antonyms: [] },
      { word: "Watermelon", hindi: "तरबूज", category: "fruit", example: "Watermelon is eaten in summer.", hindiExample: "गर्मियों में तरबूज खाया जाता है।", synonyms: [], antonyms: [] },
      { word: "Pomegranate", hindi: "अनार", category: "fruit", example: "Pomegranate is rich in iron.", hindiExample: "अनार में लोहा प्रचुर मात्रा में होता है।", synonyms: [], antonyms: [] },
      { word: "Papaya", hindi: "पपीता", category: "fruit", example: "Papaya is good for digestion.", hindiExample: "पपीता पाचन के लिए अच्छा है।", synonyms: [], antonyms: [] },
      { word: "Guava", hindi: "अमरूद", category: "fruit", example: "Guava is rich in Vitamin C.", hindiExample: "अमरूद विटामिन C से भरपूर होता है।", synonyms: [], antonyms: [] },
      { word: "Strawberry", hindi: "स्ट्रॉबेरी", category: "fruit", example: "Strawberries are sweet and red.", hindiExample: "स्ट्रॉबेरी मीठी और लाल होती हैं।", synonyms: [], antonyms: [] },
      { word: "Coconut", hindi: "नारियल", category: "fruit", example: "Coconut water is very refreshing.", hindiExample: "नारियल पानी बहुत ताजगी देता है।", synonyms: [], antonyms: [] },
      { word: "Lemon", hindi: "नींबू", category: "fruit", example: "Lemon is rich in Vitamin C.", hindiExample: "नींबू विटामिन C से भरपूर है।", synonyms: ["citrus"], antonyms: [] },
      { word: "Orange", hindi: "संतरा", category: "fruit", example: "Oranges are sweet and juicy.", hindiExample: "संतरे मीठे और रसीले होते हैं।", synonyms: ["tangerine"], antonyms: [] },
      { word: "Pear", hindi: "नाशपाती", category: "fruit", example: "Pears are crunchy and sweet.", hindiExample: "नाशपाती कुरकुरी और मीठी होती है।", synonyms: [], antonyms: [] },
      { word: "Peach", hindi: "आड़ू", category: "fruit", example: "Peaches are juicy and delicious.", hindiExample: "आड़ू रसीले और स्वादिष्ट होते हैं।", synonyms: [], antonyms: [] },
      { word: "Cherry", hindi: "चेरी", category: "fruit", example: "Cherries are small red fruits.", hindiExample: "चेरी छोटे लाल फल होते हैं।", synonyms: [], antonyms: [] },
      { word: "Kiwi", hindi: "कीवी", category: "fruit", example: "Kiwi is rich in antioxidants.", hindiExample: "कीवी एंटीऑक्सीडेंट से भरपूर है।", synonyms: [], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "What is India's national flower?", options: ["Rose", "Lotus", "Jasmine", "Marigold"], answer: "Lotus", type: "mcq" },
      { id: 2, question: "'Pomegranate' in Hindi is:", options: ["अनानास", "पपीता", "अनार", "अमरूद"], answer: "अनार", type: "mcq" },
      { id: 3, question: "Which flower turns towards the sun?", options: ["Rose", "Lily", "Sunflower", "Tulip"], answer: "Sunflower", type: "mcq" },
      { id: 4, question: "Mango is called 'king of':", options: ["Flowers", "Fruits", "Vegetables", "Spices"], answer: "Fruits", type: "mcq" },
      { id: 5, question: "Which fruit is rich in Vitamin C?", options: ["Mango", "Banana", "Guava", "Grapes"], answer: "Guava", type: "mcq" },
      { id: 6, question: "'Jasmine' in Hindi is:", options: ["गुलाब", "चमेली", "कमल", "गेंदा"], answer: "चमेली", type: "mcq" },
      { id: 7, question: "Which fruit has water inside?", options: ["Apple", "Banana", "Coconut", "Grapes"], answer: "Coconut", type: "mcq" },
      { id: 8, question: "'Strawberry' is what color?", options: ["Yellow", "Green", "Red", "Purple"], answer: "Red", type: "mcq" },
      { id: 9, question: "Hibiscus is also called:", options: ["China rose", "Night Queen", "Water lily", "Mogra"], answer: "China rose", type: "mcq" },
      { id: 10, question: "'Papaya' is good for:", options: ["Headache", "Digestion", "Memory", "Vision"], answer: "Digestion", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 63: MATHS VOCABULARY
  // ============================================================
  day63: {
    day: 63,
    title: "Maths Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 55,
    description: "Mathematical terms including numbers, operations, shapes, and concepts.",
    vocabulary: [
      { word: "Addition", hindi: "जोड़", category: "operation", example: "5 + 3 = 8 is an addition.", hindiExample: "5 + 3 = 8 जोड़ है।", synonyms: ["sum", "plus"], antonyms: ["subtraction"] },
      { word: "Subtraction", hindi: "घटाव", category: "operation", example: "10 - 4 = 6 is a subtraction.", hindiExample: "10 - 4 = 6 घटाव है।", synonyms: ["minus", "difference"], antonyms: ["addition"] },
      { word: "Multiplication", hindi: "गुणा", category: "operation", example: "3 × 4 = 12 is multiplication.", hindiExample: "3 × 4 = 12 गुणा है।", synonyms: ["times", "product"], antonyms: ["division"] },
      { word: "Division", hindi: "भाग / विभाजन", category: "operation", example: "12 ÷ 4 = 3 is division.", hindiExample: "12 ÷ 4 = 3 भाग है।", synonyms: ["divide", "quotient"], antonyms: ["multiplication"] },
      { word: "Fraction", hindi: "भिन्न", category: "number", example: "1/2 is a fraction.", hindiExample: "1/2 एक भिन्न है।", synonyms: ["part", "ratio"], antonyms: ["whole number"] },
      { word: "Decimal", hindi: "दशमलव", category: "number", example: "3.14 is a decimal number.", hindiExample: "3.14 एक दशमलव संख्या है।", synonyms: ["decimal number"], antonyms: ["integer"] },
      { word: "Percentage", hindi: "प्रतिशत", category: "number", example: "50% means half.", hindiExample: "50% का मतलब आधा है।", synonyms: ["percent", "per cent"], antonyms: [] },
      { word: "Integer", hindi: "पूर्णांक", category: "number", example: "-3, 0, 5 are integers.", hindiExample: "-3, 0, 5 पूर्णांक हैं।", synonyms: ["whole number"], antonyms: ["fraction"] },
      { word: "Prime number", hindi: "अभाज्य संख्या", category: "number", example: "2, 3, 5, 7 are prime numbers.", hindiExample: "2, 3, 5, 7 अभाज्य संख्याएँ हैं।", synonyms: [], antonyms: ["composite number"] },
      { word: "Even number", hindi: "सम संख्या", category: "number", example: "2, 4, 6, 8 are even numbers.", hindiExample: "2, 4, 6, 8 सम संख्याएँ हैं।", synonyms: [], antonyms: ["odd number"] },
      { word: "Odd number", hindi: "विषम संख्या", category: "number", example: "1, 3, 5, 7 are odd numbers.", hindiExample: "1, 3, 5, 7 विषम संख्याएँ हैं।", synonyms: [], antonyms: ["even number"] },
      { word: "Square", hindi: "वर्ग", category: "shape", example: "A square has 4 equal sides.", hindiExample: "वर्ग की 4 भुजाएँ बराबर होती हैं।", synonyms: [], antonyms: [] },
      { word: "Rectangle", hindi: "आयत", category: "shape", example: "A rectangle has 4 right angles.", hindiExample: "आयत में 4 समकोण होते हैं।", synonyms: ["oblong"], antonyms: [] },
      { word: "Triangle", hindi: "त्रिभुज", category: "shape", example: "A triangle has 3 sides.", hindiExample: "त्रिभुज की 3 भुजाएँ होती हैं।", synonyms: [], antonyms: [] },
      { word: "Circle", hindi: "वृत्त", category: "shape", example: "A circle has no corners.", hindiExample: "वृत्त में कोई कोना नहीं होता।", synonyms: ["round"], antonyms: [] },
      { word: "Diameter", hindi: "व्यास", category: "geometry", example: "Diameter passes through the center of a circle.", hindiExample: "व्यास वृत्त के केंद्र से गुजरता है।", synonyms: [], antonyms: ["radius"] },
      { word: "Radius", hindi: "त्रिज्या", category: "geometry", example: "Radius is half of the diameter.", hindiExample: "त्रिज्या व्यास का आधा होती है।", synonyms: [], antonyms: ["diameter"] },
      { word: "Perimeter", hindi: "परिमाप", category: "geometry", example: "The perimeter of a square = 4 × side.", hindiExample: "वर्ग का परिमाप = 4 × भुजा।", synonyms: ["boundary", "circumference"], antonyms: [] },
      { word: "Area", hindi: "क्षेत्रफल", category: "geometry", example: "Area = length × breadth.", hindiExample: "क्षेत्रफल = लंबाई × चौड़ाई।", synonyms: ["surface area"], antonyms: [] },
      { word: "Volume", hindi: "आयतन", category: "geometry", example: "Volume = length × breadth × height.", hindiExample: "आयतन = लंबाई × चौड़ाई × ऊँचाई।", synonyms: ["capacity"], antonyms: [] },
      { word: "Angle", hindi: "कोण", category: "geometry", example: "A right angle is 90 degrees.", hindiExample: "समकोण 90 डिग्री होता है।", synonyms: [], antonyms: [] },
      { word: "Parallel", hindi: "समानांतर", category: "geometry", example: "Parallel lines never meet.", hindiExample: "समानांतर रेखाएँ कभी नहीं मिलतीं।", synonyms: ["equidistant"], antonyms: ["intersecting", "perpendicular"] },
      { word: "Perpendicular", hindi: "लंब", category: "geometry", example: "Perpendicular lines meet at 90 degrees.", hindiExample: "लंब रेखाएँ 90 डिग्री पर मिलती हैं।", synonyms: ["vertical to"], antonyms: ["parallel"] },
      { word: "Algebra", hindi: "बीजगणित", category: "branch", example: "Algebra uses variables like x and y.", hindiExample: "बीजगणित में x और y जैसे चर उपयोग होते हैं।", synonyms: [], antonyms: [] },
      { word: "Geometry", hindi: "रेखागणित", category: "branch", example: "Geometry deals with shapes and figures.", hindiExample: "रेखागणित आकार और आकृतियों से संबंधित है।", synonyms: [], antonyms: [] },
      { word: "Average", hindi: "औसत", category: "statistics", example: "The average of 2, 4, 6 is 4.", hindiExample: "2, 4, 6 का औसत 4 है।", synonyms: ["mean", "median"], antonyms: [] },
      { word: "Ratio", hindi: "अनुपात", category: "number", example: "The ratio of boys to girls is 3:2.", hindiExample: "लड़कों और लड़कियों का अनुपात 3:2 है।", synonyms: ["proportion"], antonyms: [] },
      { word: "Probability", hindi: "प्रायिकता", category: "statistics", example: "The probability of heads is 1/2.", hindiExample: "सिर आने की प्रायिकता 1/2 है।", synonyms: ["likelihood", "chance"], antonyms: ["impossibility"] },
    ],
    testQuestions: [
      { id: 1, question: "5 + 3 is called:", options: ["Subtraction", "Multiplication", "Addition", "Division"], answer: "Addition", type: "mcq" },
      { id: 2, question: "'Fraction' in Hindi is:", options: ["दशमलव", "भिन्न", "प्रतिशत", "पूर्णांक"], answer: "भिन्न", type: "mcq" },
      { id: 3, question: "A shape with 3 sides is called:", options: ["Square", "Rectangle", "Triangle", "Circle"], answer: "Triangle", type: "mcq" },
      { id: 4, question: "'Radius' is half of:", options: ["Area", "Diameter", "Perimeter", "Volume"], answer: "Diameter", type: "mcq" },
      { id: 5, question: "'Odd numbers' include:", options: ["2, 4, 6", "1, 3, 5", "0, 2, 4", "10, 20, 30"], answer: "1, 3, 5", type: "mcq" },
      { id: 6, question: "Area of rectangle = :", options: ["side × side", "length + breadth", "length × breadth", "2 × (l + b)"], answer: "length × breadth", type: "mcq" },
      { id: 7, question: "Parallel lines:", options: ["Meet at 90°", "Never meet", "Cross each other", "Form a circle"], answer: "Never meet", type: "mcq" },
      { id: 8, question: "'Percentage' means:", options: ["Per thousand", "Per hundred", "Per million", "Per ten"], answer: "Per hundred", type: "mcq" },
      { id: 9, question: "2, 3, 5, 7 are:", options: ["Even numbers", "Odd numbers", "Prime numbers", "Decimals"], answer: "Prime numbers", type: "mcq" },
      { id: 10, question: "'Probability' in Hindi is:", options: ["अनुपात", "औसत", "प्रायिकता", "आयतन"], answer: "प्रायिकता", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 64: BODY & DISEASES VOCABULARY
  // ============================================================
  day64: {
    day: 64,
    title: "Body & Diseases Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 55,
    description: "Human body parts and common diseases vocabulary with Hindi meanings.",
    vocabulary: [
      // Body Parts
      { word: "Forehead", hindi: "माथा", category: "body", example: "She has a fever; her forehead is hot.", hindiExample: "उसे बुखार है; उसका माथा गरम है।", synonyms: ["brow"], antonyms: [] },
      { word: "Eyebrow", hindi: "भौंह", category: "body", example: "She raised her eyebrow in surprise.", hindiExample: "उसने आश्चर्य में भौंह उठाई।", synonyms: ["brow"], antonyms: [] },
      { word: "Eyelash", hindi: "पलक / बरौनी", category: "body", example: "Long eyelashes are beautiful.", hindiExample: "लंबी पलकें सुंदर होती हैं।", synonyms: [], antonyms: [] },
      { word: "Nostril", hindi: "नथुना", category: "body", example: "Air enters through the nostrils.", hindiExample: "नथुनों से हवा अंदर आती है।", synonyms: [], antonyms: [] },
      { word: "Jaw", hindi: "जबड़ा", category: "body", example: "He has a strong jaw.", hindiExample: "उसका जबड़ा मजबूत है।", synonyms: ["mandible"], antonyms: [] },
      { word: "Shoulder", hindi: "कंधा", category: "body", example: "She carries the bag on her shoulder.", hindiExample: "वह कंधे पर बैग उठाती है।", synonyms: [], antonyms: [] },
      { word: "Elbow", hindi: "कोहनी", category: "body", example: "He hurt his elbow.", hindiExample: "उसकी कोहनी में चोट लगी।", synonyms: [], antonyms: [] },
      { word: "Wrist", hindi: "कलाई", category: "body", example: "She wears a bracelet on her wrist.", hindiExample: "वह कलाई पर कंगन पहनती है।", synonyms: [], antonyms: [] },
      { word: "Knuckle", hindi: "उँगली का जोड़", category: "body", example: "He knocked with his knuckles.", hindiExample: "उसने उँगलियों के जोड़ से दस्तक दी।", synonyms: [], antonyms: [] },
      { word: "Spine", hindi: "रीढ़ की हड्डी", category: "body", example: "The spine supports the body.", hindiExample: "रीढ़ की हड्डी शरीर को सहारा देती है।", synonyms: ["vertebral column", "backbone"], antonyms: [] },
      { word: "Kidney", hindi: "गुर्दा", category: "organ", example: "Kidneys filter the blood.", hindiExample: "गुर्दे खून को साफ करते हैं।", synonyms: ["renal organ"], antonyms: [] },
      { word: "Liver", hindi: "जिगर / यकृत", category: "organ", example: "The liver produces bile.", hindiExample: "यकृत पित्त बनाता है।", synonyms: ["hepatic organ"], antonyms: [] },
      { word: "Lungs", hindi: "फेफड़े", category: "organ", example: "We breathe with our lungs.", hindiExample: "हम फेफड़ों से साँस लेते हैं।", synonyms: [], antonyms: [] },
      { word: "Heart", hindi: "हृदय / दिल", category: "organ", example: "The heart pumps blood.", hindiExample: "हृदय रक्त पंप करता है।", synonyms: ["cardiac organ"], antonyms: [] },
      { word: "Stomach", hindi: "पेट", category: "organ", example: "The stomach digests food.", hindiExample: "पेट भोजन पचाता है।", synonyms: ["tummy", "abdomen"], antonyms: [] },
      // Diseases
      { word: "Fever", hindi: "बुखार", category: "disease", example: "She has a high fever.", hindiExample: "उसे तेज बुखार है।", synonyms: ["temperature", "pyrexia"], antonyms: ["health"] },
      { word: "Cough", hindi: "खाँसी", category: "disease", example: "He has a bad cough.", hindiExample: "उसे तेज खाँसी है।", synonyms: ["cold"], antonyms: [] },
      { word: "Cold", hindi: "जुकाम / सर्दी", category: "disease", example: "She caught a cold in the rain.", hindiExample: "बारिश में उसे जुकाम हो गया।", synonyms: ["flu"], antonyms: [] },
      { word: "Headache", hindi: "सिरदर्द", category: "disease", example: "I have a severe headache.", hindiExample: "मुझे तेज सिरदर्द है।", synonyms: ["migraine"], antonyms: [] },
      { word: "Malaria", hindi: "मलेरिया", category: "disease", example: "Malaria is spread by mosquitoes.", hindiExample: "मलेरिया मच्छरों से फैलता है।", synonyms: [], antonyms: [] },
      { word: "Diabetes", hindi: "मधुमेह / शुगर", category: "disease", example: "He controls his diabetes with diet.", hindiExample: "वह आहार से अपनी मधुमेह नियंत्रित करता है।", synonyms: ["sugar disease"], antonyms: [] },
      { word: "Asthma", hindi: "दमा", category: "disease", example: "Asthma causes breathing difficulties.", hindiExample: "दमे से साँस लेने में तकलीफ होती है।", synonyms: ["respiratory illness"], antonyms: [] },
      { word: "Fracture", hindi: "हड्डी टूटना", category: "injury", example: "He got a fracture in his leg.", hindiExample: "उसकी टाँग में फ्रेक्चर हो गया।", synonyms: ["break", "crack"], antonyms: [] },
      { word: "Allergy", hindi: "एलर्जी", category: "disease", example: "She has an allergy to dust.", hindiExample: "उसे धूल से एलर्जी है।", synonyms: ["sensitivity", "reaction"], antonyms: [] },
      { word: "Infection", hindi: "संक्रमण", category: "disease", example: "Wash hands to prevent infection.", hindiExample: "संक्रमण से बचने के लिए हाथ धोएं।", synonyms: ["contamination", "contagion"], antonyms: [] },
      { word: "Vaccination", hindi: "टीकाकरण", category: "treatment", example: "Vaccination prevents diseases.", hindiExample: "टीकाकरण बीमारियों से बचाता है।", synonyms: ["immunization", "inoculation"], antonyms: [] },
      { word: "Surgery", hindi: "शल्य चिकित्सा / ऑपरेशन", category: "treatment", example: "He underwent surgery yesterday.", hindiExample: "उसका कल ऑपरेशन हुआ।", synonyms: ["operation", "procedure"], antonyms: [] },
      { word: "Diagnosis", hindi: "रोग निदान", category: "treatment", example: "Early diagnosis helps cure diseases.", hindiExample: "शुरुआती रोग निदान बीमारी ठीक करने में मदद करता है।", synonyms: ["examination", "assessment"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Kidney' in Hindi is:", options: ["दिल", "फेफड़े", "गुर्दा", "जिगर"], answer: "गुर्दा", type: "mcq" },
      { id: 2, question: "Malaria is spread by:", options: ["Flies", "Mosquitoes", "Rats", "Cockroaches"], answer: "Mosquitoes", type: "mcq" },
      { id: 3, question: "'Spine' supports the:", options: ["Head", "Hands", "Body", "Heart"], answer: "Body", type: "mcq" },
      { id: 4, question: "'Vaccination' is used to:", options: ["Diagnose disease", "Prevent disease", "Cure fever", "Reduce pain"], answer: "Prevent disease", type: "mcq" },
      { id: 5, question: "'Asthma' affects:", options: ["Heart", "Kidneys", "Lungs/Breathing", "Stomach"], answer: "Lungs/Breathing", type: "mcq" },
      { id: 6, question: "Hindi for 'Fracture' is:", options: ["संक्रमण", "एलर्जी", "हड्डी टूटना", "बुखार"], answer: "हड्डी टूटना", type: "mcq" },
      { id: 7, question: "The heart pumps:", options: ["Air", "Water", "Blood", "Food"], answer: "Blood", type: "mcq" },
      { id: 8, question: "'Diagnosis' means:", options: ["Treatment", "Surgery", "Finding out the disease", "Medicine"], answer: "Finding out the disease", type: "mcq" },
      { id: 9, question: "Liver produces:", options: ["Blood", "Bile", "Insulin", "Oxygen"], answer: "Bile", type: "mcq" },
      { id: 10, question: "'Diabetes' is also called:", options: ["Blood pressure", "Sugar disease", "Fever", "Cold"], answer: "Sugar disease", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 65: INDUSTRY VOCABULARY
  // ============================================================
  day65: {
    day: 65,
    title: "Industry Vocabulary",
    category: "vocabulary",
    difficulty: "hard",
    duration: 60,
    description: "Manufacturing, technology, and industrial vocabulary with Hindi meanings.",
    vocabulary: [
      { word: "Manufacturing", hindi: "विनिर्माण", category: "industry", example: "India has a strong manufacturing sector.", hindiExample: "भारत का विनिर्माण क्षेत्र मजबूत है।", synonyms: ["production", "fabrication"], antonyms: [] },
      { word: "Assembly line", hindi: "असेंबली लाइन", category: "industry", example: "Cars are made on an assembly line.", hindiExample: "कारें असेंबली लाइन पर बनती हैं।", synonyms: ["production line"], antonyms: [] },
      { word: "Raw material", hindi: "कच्चा माल", category: "industry", example: "Steel is a raw material for cars.", hindiExample: "स्टील कारों के लिए कच्चा माल है।", synonyms: ["input material"], antonyms: ["finished product"] },
      { word: "Productivity", hindi: "उत्पादकता", category: "industry", example: "Technology improves productivity.", hindiExample: "प्रौद्योगिकी उत्पादकता बढ़ाती है।", synonyms: ["efficiency", "output"], antonyms: ["inefficiency"] },
      { word: "Export", hindi: "निर्यात", category: "trade", example: "India exports tea to many countries.", hindiExample: "भारत कई देशों को चाय निर्यात करता है।", synonyms: ["ship out", "trade"], antonyms: ["import"] },
      { word: "Import", hindi: "आयात", category: "trade", example: "India imports oil from Arab countries.", hindiExample: "भारत अरब देशों से तेल आयात करता है।", synonyms: ["bring in"], antonyms: ["export"] },
      { word: "Automation", hindi: "स्वचालन", category: "technology", example: "Automation reduces human labour.", hindiExample: "स्वचालन मानव श्रम को कम करता है।", synonyms: ["mechanization"], antonyms: ["manual work"] },
      { word: "Technology", hindi: "प्रौद्योगिकी", category: "technology", example: "Technology has changed the world.", hindiExample: "प्रौद्योगिकी ने दुनिया बदल दी है।", synonyms: ["innovation", "tech"], antonyms: [] },
      { word: "Machinery", hindi: "मशीनरी", category: "industry", example: "Heavy machinery is used in factories.", hindiExample: "कारखानों में भारी मशीनरी का उपयोग होता है।", synonyms: ["equipment", "apparatus"], antonyms: [] },
      { word: "Labour", hindi: "श्रम / मजदूरी", category: "industry", example: "Child labour is illegal.", hindiExample: "बाल मजदूरी गैरकानूनी है।", synonyms: ["work", "toil"], antonyms: ["rest", "leisure"] },
      { word: "Revenue", hindi: "राजस्व / आमदनी", category: "business", example: "The company earned high revenue.", hindiExample: "कंपनी ने अधिक राजस्व कमाया।", synonyms: ["income", "earnings"], antonyms: ["expenditure", "loss"] },
      { word: "Investment", hindi: "निवेश", category: "business", example: "Investment in education pays off.", hindiExample: "शिक्षा में निवेश फायदेमंद है।", synonyms: ["spending", "capital"], antonyms: ["withdrawal"] },
      { word: "Infrastructure", hindi: "बुनियादी ढाँचा", category: "industry", example: "Good infrastructure attracts investment.", hindiExample: "अच्छा बुनियादी ढाँचा निवेश आकर्षित करता है।", synonyms: ["framework", "facilities"], antonyms: [] },
      { word: "Pollution", hindi: "प्रदूषण", category: "environment", example: "Industry causes pollution.", hindiExample: "उद्योग प्रदूषण का कारण बनता है।", synonyms: ["contamination"], antonyms: ["purity", "cleanliness"] },
      { word: "Renewable energy", hindi: "नवीकरणीय ऊर्जा", category: "energy", example: "Solar power is renewable energy.", hindiExample: "सौर ऊर्जा नवीकरणीय ऊर्जा है।", synonyms: ["green energy", "clean energy"], antonyms: ["fossil fuel"] },
      { word: "Supply chain", hindi: "आपूर्ति श्रृंखला", category: "industry", example: "A strong supply chain ensures delivery.", hindiExample: "मजबूत आपूर्ति श्रृंखला समय पर डिलीवरी सुनिश्चित करती है।", synonyms: ["logistics chain"], antonyms: [] },
      { word: "Patent", hindi: "पेटेंट", category: "technology", example: "The company filed a patent for its invention.", hindiExample: "कंपनी ने अपने आविष्कार के लिए पेटेंट दाखिल किया।", synonyms: ["intellectual property right"], antonyms: [] },
      { word: "Innovation", hindi: "नवाचार", category: "technology", example: "Innovation drives industrial growth.", hindiExample: "नवाचार औद्योगिक विकास को गति देता है।", synonyms: ["invention", "creativity"], antonyms: ["stagnation"] },
      { word: "Outsourcing", hindi: "बाहरी स्रोत से कार्य करवाना", category: "business", example: "Many companies outsource IT work.", hindiExample: "कई कंपनियाँ IT कार्य बाहर से करवाती हैं।", synonyms: ["contracting out"], antonyms: ["insourcing"] },
      { word: "Workforce", hindi: "कार्यबल", category: "industry", example: "India has a large workforce.", hindiExample: "भारत के पास बड़ा कार्यबल है।", synonyms: ["employees", "staff"], antonyms: [] },
      { word: "Profit", hindi: "लाभ / मुनाफा", category: "business", example: "The company made a huge profit.", hindiExample: "कंपनी ने बड़ा मुनाफा कमाया।", synonyms: ["gain", "earnings"], antonyms: ["loss"] },
      { word: "Loss", hindi: "हानि / नुकसान", category: "business", example: "Bad decisions led to a loss.", hindiExample: "गलत फैसलों से नुकसान हुआ।", synonyms: ["deficit", "setback"], antonyms: ["profit", "gain"] },
      { word: "Merger", hindi: "विलय", category: "business", example: "The merger created a larger company.", hindiExample: "विलय से एक बड़ी कंपनी बनी।", synonyms: ["amalgamation", "union"], antonyms: ["split", "separation"] },
      { word: "Quality control", hindi: "गुणवत्ता नियंत्रण", category: "industry", example: "Quality control ensures good products.", hindiExample: "गुणवत्ता नियंत्रण अच्छे उत्पाद सुनिश्चित करता है।", synonyms: ["QC", "quality assurance"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Export' means:", options: ["Goods coming in", "Goods going out", "Storage", "Manufacturing"], answer: "Goods going out", type: "mcq" },
      { id: 2, question: "'Automation' reduces:", options: ["Quality", "Revenue", "Human labour", "Profit"], answer: "Human labour", type: "mcq" },
      { id: 3, question: "Hindi for 'Revenue' is:", options: ["नुकसान", "राजस्व", "निवेश", "मजदूरी"], answer: "राजस्व", type: "mcq" },
      { id: 4, question: "'Raw material' is used to:", options: ["Sell goods", "Make products", "Export items", "Earn profit"], answer: "Make products", type: "mcq" },
      { id: 5, question: "Renewable energy includes:", options: ["Coal", "Petrol", "Solar power", "Wood"], answer: "Solar power", type: "mcq" },
      { id: 6, question: "'Patent' protects:", options: ["Workers", "Inventions", "Factories", "Resources"], answer: "Inventions", type: "mcq" },
      { id: 7, question: "Opposite of 'Export' is:", options: ["Trade", "Import", "Supply", "Revenue"], answer: "Import", type: "mcq" },
      { id: 8, question: "'Merger' in Hindi is:", options: ["विभाजन", "विलय", "निवेश", "आयात"], answer: "विलय", type: "mcq" },
      { id: 9, question: "'Supply chain' ensures:", options: ["Manufacturing", "Timely delivery", "Pollution control", "Labour laws"], answer: "Timely delivery", type: "mcq" },
      { id: 10, question: "Antonym of 'Profit' is:", options: ["Revenue", "Income", "Loss", "Investment"], answer: "Loss", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 66: COLOURS & JUDICIARY VOCABULARY
  // ============================================================
  day66: {
    day: 66,
    title: "Colours & Judiciary Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 50,
    description: "Names of colours and legal/judiciary vocabulary with Hindi meanings.",
    vocabulary: [
      // Colours
      { word: "Scarlet", hindi: "लाल / स्कार्लेट", category: "colour", example: "She wore a scarlet dress.", hindiExample: "उसने स्कार्लेट रंग की पोशाक पहनी।", synonyms: ["crimson", "red"], antonyms: [] },
      { word: "Crimson", hindi: "गहरा लाल", category: "colour", example: "The sky turned crimson at sunset.", hindiExample: "सूर्यास्त के समय आकाश गहरा लाल हो गया।", synonyms: ["scarlet", "deep red"], antonyms: [] },
      { word: "Azure", hindi: "आसमानी नीला", category: "colour", example: "The sky is azure on a clear day.", hindiExample: "साफ दिन पर आसमान आसमानी नीला होता है।", synonyms: ["sky blue"], antonyms: [] },
      { word: "Amber", hindi: "एम्बर / पीलापन लिए हुए", category: "colour", example: "The traffic light turned amber.", hindiExample: "ट्रैफिक लाइट एम्बर हो गई।", synonyms: ["golden yellow", "honey color"], antonyms: [] },
      { word: "Ivory", hindi: "हाथीदाँत जैसा सफेद", category: "colour", example: "She wore an ivory wedding gown.", hindiExample: "उसने आइवरी रंग का विवाह वस्त्र पहना।", synonyms: ["cream white", "off-white"], antonyms: [] },
      { word: "Turquoise", hindi: "फ़िरोजी रंग", category: "colour", example: "The sea looked turquoise.", hindiExample: "समुद्र फ़िरोजी दिख रहा था।", synonyms: ["teal", "blue-green"], antonyms: [] },
      { word: "Violet", hindi: "बैंगनी", category: "colour", example: "Violets are violet in colour.", hindiExample: "पैंसी फूल बैंगनी रंग के होते हैं।", synonyms: ["purple", "lavender"], antonyms: [] },
      { word: "Maroon", hindi: "गहरा भूरा-लाल / मैरून", category: "colour", example: "He wore a maroon jacket.", hindiExample: "उसने मैरून जैकेट पहनी।", synonyms: ["dark red", "burgundy"], antonyms: [] },
      { word: "Beige", hindi: "हल्का पीला-भूरा / बेज", category: "colour", example: "The walls are painted beige.", hindiExample: "दीवारें बेज रंग में रंगी हैं।", synonyms: ["sandy", "off-white"], antonyms: [] },
      { word: "Indigo", hindi: "नील / इंडिगो", category: "colour", example: "Indigo is a shade of blue.", hindiExample: "इंडिगो नीले रंग का एक शेड है।", synonyms: ["deep blue", "navy"], antonyms: [] },
      // Judiciary / Legal
      { word: "Constitution", hindi: "संविधान", category: "judiciary", example: "The Constitution is the supreme law.", hindiExample: "संविधान सर्वोच्च कानून है।", synonyms: ["fundamental law"], antonyms: [] },
      { word: "Verdict", hindi: "फैसला / निर्णय", category: "judiciary", example: "The court gave its verdict.", hindiExample: "अदालत ने फैसला सुनाया।", synonyms: ["judgment", "ruling"], antonyms: [] },
      { word: "Bail", hindi: "जमानत", category: "judiciary", example: "He was released on bail.", hindiExample: "उसे जमानत पर रिहा किया गया।", synonyms: ["bond", "surety"], antonyms: ["custody", "imprisonment"] },
      { word: "Custody", hindi: "हिरासत", category: "judiciary", example: "The accused is in police custody.", hindiExample: "आरोपी पुलिस हिरासत में है।", synonyms: ["detention", "imprisonment"], antonyms: ["bail", "freedom"] },
      { word: "Lawsuit", hindi: "मुकदमा", category: "judiciary", example: "She filed a lawsuit against the company.", hindiExample: "उसने कंपनी के खिलाफ मुकदमा दायर किया।", synonyms: ["case", "suit", "litigation"], antonyms: [] },
      { word: "Witness", hindi: "गवाह", category: "judiciary", example: "The witness gave his testimony.", hindiExample: "गवाह ने अपनी गवाही दी।", synonyms: ["eyewitness", "deponent"], antonyms: [] },
      { word: "Evidence", hindi: "साक्ष्य / प्रमाण", category: "judiciary", example: "The evidence proved his guilt.", hindiExample: "साक्ष्य ने उसका अपराध साबित किया।", synonyms: ["proof", "testimony"], antonyms: [] },
      { word: "Accused", hindi: "आरोपी", category: "judiciary", example: "The accused denied the charges.", hindiExample: "आरोपी ने आरोपों से इनकार किया।", synonyms: ["defendant", "suspect"], antonyms: ["plaintiff"] },
      { word: "Acquittal", hindi: "बरी करना / दोषमुक्ति", category: "judiciary", example: "The accused got acquittal.", hindiExample: "आरोपी को दोषमुक्त किया गया।", synonyms: ["exoneration", "clearance"], antonyms: ["conviction"] },
      { word: "Conviction", hindi: "दोषसिद्धि", category: "judiciary", example: "He appealed against his conviction.", hindiExample: "उसने अपनी दोषसिद्धि के खिलाफ अपील की।", synonyms: ["sentence", "condemnation"], antonyms: ["acquittal"] },
      { word: "Plaintiff", hindi: "वादी", category: "judiciary", example: "The plaintiff filed the case.", hindiExample: "वादी ने मुकदमा दाखिल किया।", synonyms: ["complainant", "claimant"], antonyms: ["defendant"] },
      { word: "Defendant", hindi: "प्रतिवादी / आरोपी", category: "judiciary", example: "The defendant pleaded innocent.", hindiExample: "प्रतिवादी ने निर्दोष होने की दलील दी।", synonyms: ["accused", "respondent"], antonyms: ["plaintiff"] },
      { word: "Penalty", hindi: "दंड / जुर्माना", category: "judiciary", example: "He paid a heavy penalty.", hindiExample: "उसने भारी जुर्माना दिया।", synonyms: ["punishment", "fine"], antonyms: ["reward", "prize"] },
      { word: "Tribunal", hindi: "न्यायाधिकरण", category: "judiciary", example: "The matter was referred to the tribunal.", hindiExample: "मामला न्यायाधिकरण को भेजा गया।", synonyms: ["court", "bench"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Verdict' in Hindi is:", options: ["जमानत", "फैसला", "आरोप", "गवाह"], answer: "फैसला", type: "mcq" },
      { id: 2, question: "Azure is a shade of:", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue", type: "mcq" },
      { id: 3, question: "'Bail' means:", options: ["हिरासत", "जमानत", "सजा", "मुकदमा"], answer: "जमानत", type: "mcq" },
      { id: 4, question: "Opposite of 'Conviction' is:", options: ["Bail", "Penalty", "Acquittal", "Custody"], answer: "Acquittal", type: "mcq" },
      { id: 5, question: "'Plaintiff' files the case, and 'Defendant' is the:", options: ["Judge", "Witness", "Person accused", "Lawyer"], answer: "Person accused", type: "mcq" },
      { id: 6, question: "Indigo is a shade of:", options: ["Red", "Blue", "Green", "Yellow"], answer: "Blue", type: "mcq" },
      { id: 7, question: "'Constitution' is:", options: ["A judge", "The supreme law of the country", "A court", "A verdict"], answer: "The supreme law of the country", type: "mcq" },
      { id: 8, question: "'Evidence' in Hindi is:", options: ["गवाह", "आरोपी", "साक्ष्य", "वकील"], answer: "साक्ष्य", type: "mcq" },
      { id: 9, question: "Maroon is a shade of:", options: ["Blue", "Green", "Dark red", "Yellow"], answer: "Dark red", type: "mcq" },
      { id: 10, question: "'Penalty' means:", options: ["Reward", "Punishment/Fine", "Freedom", "Bail"], answer: "Punishment/Fine", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 67: BIRDS & ASTROLOGY VOCABULARY
  // ============================================================
  day67: {
    day: 67,
    title: "Birds & Astrology Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 50,
    description: "Names of birds and astrology-related vocabulary with Hindi meanings.",
    vocabulary: [
      // Birds
      { word: "Sparrow", hindi: "गौरैया", category: "bird", example: "A sparrow sat on the window.", hindiExample: "खिड़की पर एक गौरैया बैठी।", synonyms: [], antonyms: [] },
      { word: "Peacock", hindi: "मोर", category: "bird", example: "The peacock is India's national bird.", hindiExample: "मोर भारत का राष्ट्रीय पक्षी है।", synonyms: [], antonyms: [] },
      { word: "Parrot", hindi: "तोता", category: "bird", example: "The parrot can speak words.", hindiExample: "तोता शब्द बोल सकता है।", synonyms: [], antonyms: [] },
      { word: "Crow", hindi: "कौआ", category: "bird", example: "Crows are very intelligent birds.", hindiExample: "कौए बहुत बुद्धिमान पक्षी हैं।", synonyms: ["raven"], antonyms: [] },
      { word: "Eagle", hindi: "चील / बाज", category: "bird", example: "The eagle soared high in the sky.", hindiExample: "चील आकाश में ऊँची उड़ान भरी।", synonyms: ["hawk", "falcon"], antonyms: [] },
      { word: "Owl", hindi: "उल्लू", category: "bird", example: "Owls can see in the dark.", hindiExample: "उल्लू अँधेरे में देख सकते हैं।", synonyms: [], antonyms: [] },
      { word: "Pigeon", hindi: "कबूतर", category: "bird", example: "Pigeons were used to send messages.", hindiExample: "संदेश भेजने के लिए कबूतरों का उपयोग होता था।", synonyms: ["dove"], antonyms: [] },
      { word: "Kingfisher", hindi: "किलकिला / नीलकंठ", category: "bird", example: "The kingfisher dives to catch fish.", hindiExample: "नीलकंठ मछली पकड़ने के लिए गोता लगाता है।", synonyms: [], antonyms: [] },
      { word: "Flamingo", hindi: "फ्लेमिंगो / राजहंस", category: "bird", example: "Flamingos are pink in colour.", hindiExample: "फ्लेमिंगो गुलाबी रंग के होते हैं।", synonyms: [], antonyms: [] },
      { word: "Nightingale", hindi: "बुलबुल / नाइटिंगेल", category: "bird", example: "The nightingale sings sweetly.", hindiExample: "बुलबुल मीठा गाती है।", synonyms: ["songbird"], antonyms: [] },
      { word: "Swan", hindi: "हंस", category: "bird", example: "Swans are known for grace.", hindiExample: "हंस अपनी कोमलता के लिए जाने जाते हैं।", synonyms: [], antonyms: [] },
      { word: "Cuckoo", hindi: "कोयल", category: "bird", example: "The cuckoo sings in summer.", hindiExample: "कोयल गर्मियों में गाती है।", synonyms: [], antonyms: [] },
      // Astrology
      { word: "Zodiac", hindi: "राशिचक्र", category: "astrology", example: "There are 12 signs in the zodiac.", hindiExample: "राशिचक्र में 12 राशियाँ होती हैं।", synonyms: ["horoscope"], antonyms: [] },
      { word: "Horoscope", hindi: "जन्मपत्री / कुंडली", category: "astrology", example: "She reads her horoscope daily.", hindiExample: "वह रोज अपनी कुंडली पढ़ती है।", synonyms: ["birth chart", "natal chart"], antonyms: [] },
      { word: "Planet", hindi: "ग्रह", category: "astrology", example: "Saturn is a major planet in astrology.", hindiExample: "शनि ज्योतिष में एक प्रमुख ग्रह है।", synonyms: ["celestial body"], antonyms: [] },
      { word: "Star sign", hindi: "राशि", category: "astrology", example: "My star sign is Aries.", hindiExample: "मेरी राशि मेष है।", synonyms: ["sun sign", "zodiac sign"], antonyms: [] },
      { word: "Fortune", hindi: "भाग्य", category: "astrology", example: "Astrologers predict fortune.", hindiExample: "ज्योतिषी भाग्य बताते हैं।", synonyms: ["luck", "destiny"], antonyms: ["misfortune"] },
      { word: "Prediction", hindi: "भविष्यवाणी", category: "astrology", example: "Astrological predictions vary.", hindiExample: "ज्योतिषीय भविष्यवाणियाँ अलग-अलग होती हैं।", synonyms: ["forecast", "prophecy"], antonyms: [] },
      { word: "Constellation", hindi: "नक्षत्र मंडल / तारामंडल", category: "astrology", example: "Orion is a famous constellation.", hindiExample: "ओरियन एक प्रसिद्ध तारामंडल है।", synonyms: ["star group"], antonyms: [] },
      { word: "Eclipse", hindi: "ग्रहण", category: "astrology", example: "A solar eclipse darkens the sky.", hindiExample: "सूर्यग्रहण से आकाश अँधेरा हो जाता है।", synonyms: [], antonyms: [] },
      { word: "Astrologer", hindi: "ज्योतिषी", category: "astrology", example: "The astrologer studied the planets.", hindiExample: "ज्योतिषी ने ग्रहों का अध्ययन किया।", synonyms: ["fortune teller"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "India's national bird is:", options: ["Crow", "Parrot", "Peacock", "Eagle"], answer: "Peacock", type: "mcq" },
      { id: 2, question: "'Nightingale' in Hindi is:", options: ["कौआ", "बुलबुल", "उल्लू", "तोता"], answer: "बुलबुल", type: "mcq" },
      { id: 3, question: "Flamingos are which colour?", options: ["Blue", "Red", "Pink", "White"], answer: "Pink", type: "mcq" },
      { id: 4, question: "'Zodiac' has how many signs?", options: ["7", "9", "12", "15"], answer: "12", type: "mcq" },
      { id: 5, question: "A solar 'Eclipse' occurs when:", options: ["Moon blocks sun", "Sun blocks moon", "Stars align", "Planets collide"], answer: "Moon blocks sun", type: "mcq" },
      { id: 6, question: "'Horoscope' in Hindi is:", options: ["राशिचक्र", "कुंडली", "तारामंडल", "नक्षत्र"], answer: "कुंडली", type: "mcq" },
      { id: 7, question: "Owls can see:", options: ["Only in daylight", "In darkness", "Only underwater", "Only at noon"], answer: "In darkness", type: "mcq" },
      { id: 8, question: "'Constellation' is a group of:", options: ["Planets", "Stars", "Comets", "Moons"], answer: "Stars", type: "mcq" },
      { id: 9, question: "'Cuckoo' is associated with:", options: ["Winter", "Monsoon", "Summer", "Autumn"], answer: "Summer", type: "mcq" },
      { id: 10, question: "'Fortune' in astrology means:", options: ["Disease", "Luck/Destiny", "Prediction", "Star"], answer: "Luck/Destiny", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 68: FACTORY, SPORTS, SOUND & MATHS VOCABULARY
  // ============================================================
  day68: {
    day: 68,
    title: "Factory, Sports, Sound & Maths Vocabulary",
    category: "vocabulary",
    difficulty: "medium",
    duration: 60,
    description: "Vocabulary about factories, sports, sounds, and mathematical terms.",
    vocabulary: [
      // Factory
      { word: "Factory", hindi: "कारखाना", category: "factory", example: "The factory produces 1000 units daily.", hindiExample: "कारखाना रोज 1000 इकाइयाँ बनाता है।", synonyms: ["plant", "mill"], antonyms: [] },
      { word: "Worker", hindi: "मजदूर / कर्मचारी", category: "factory", example: "Factory workers work in shifts.", hindiExample: "कारखाने के कर्मचारी पाली में काम करते हैं।", synonyms: ["labourer", "employee"], antonyms: ["employer", "manager"] },
      { word: "Foreman", hindi: "फोरमैन / सुपरवाइजर", category: "factory", example: "The foreman supervised the workers.", hindiExample: "फोरमैन ने कर्मचारियों की निगरानी की।", synonyms: ["supervisor", "overseer"], antonyms: [] },
      { word: "Shift", hindi: "पाली", category: "factory", example: "He works the night shift.", hindiExample: "वह रात की पाली में काम करता है।", synonyms: ["duty period"], antonyms: [] },
      { word: "Output", hindi: "उत्पादन / आउटपुट", category: "factory", example: "The output increased this month.", hindiExample: "इस महीने उत्पादन बढ़ा।", synonyms: ["production", "yield"], antonyms: ["input"] },
      // Sports
      { word: "Tournament", hindi: "टूर्नामेंट / प्रतियोगिता", category: "sports", example: "The cricket tournament begins tomorrow.", hindiExample: "क्रिकेट टूर्नामेंट कल शुरू होता है।", synonyms: ["championship", "contest"], antonyms: [] },
      { word: "Trophy", hindi: "ट्रॉफी", category: "sports", example: "The winner received a trophy.", hindiExample: "विजेता को ट्रॉफी मिली।", synonyms: ["cup", "award"], antonyms: [] },
      { word: "Stadium", hindi: "स्टेडियम", category: "sports", example: "The stadium was full of fans.", hindiExample: "स्टेडियम प्रशंसकों से भरा था।", synonyms: ["arena", "ground"], antonyms: [] },
      { word: "Champion", hindi: "चैंपियन / विजेता", category: "sports", example: "India is the world cricket champion.", hindiExample: "भारत विश्व क्रिकेट चैंपियन है।", synonyms: ["winner", "victor"], antonyms: ["loser"] },
      { word: "Referee", hindi: "रेफरी / निर्णायक", category: "sports", example: "The referee blew the whistle.", hindiExample: "रेफरी ने सीटी बजाई।", synonyms: ["umpire", "judge"], antonyms: [] },
      { word: "Athlete", hindi: "खिलाड़ी / एथलीट", category: "sports", example: "Athletes train hard every day.", hindiExample: "खिलाड़ी रोज कड़ा अभ्यास करते हैं।", synonyms: ["sportsperson", "player"], antonyms: [] },
      { word: "Sprint", hindi: "तेज दौड़", category: "sports", example: "She won the 100m sprint.", hindiExample: "उसने 100 मीटर तेज दौड़ जीती।", synonyms: ["dash", "run"], antonyms: ["marathon", "jog"] },
      // Sounds
      { word: "Echo", hindi: "गूँज / प्रतिध्वनि", category: "sound", example: "There was an echo in the cave.", hindiExample: "गुफा में गूँज थी।", synonyms: ["reverberation", "resonance"], antonyms: [] },
      { word: "Whisper", hindi: "फुसफुसाना", category: "sound", example: "She whispered the secret in my ear.", hindiExample: "उसने कान में राज फुसफुसाया।", synonyms: ["murmur", "mutter"], antonyms: ["shout", "yell"] },
      { word: "Roar", hindi: "दहाड़", category: "sound", example: "The lion roared loudly.", hindiExample: "शेर ने जोर से दहाड़ लगाई।", synonyms: ["growl", "bellow"], antonyms: ["whisper"] },
      { word: "Buzz", hindi: "भिनभिनाहट", category: "sound", example: "Bees make a buzzing sound.", hindiExample: "मधुमक्खियाँ भिनभिनाने की आवाज करती हैं।", synonyms: ["hum", "drone"], antonyms: [] },
      { word: "Murmur", hindi: "बड़बड़ाना / कुड़कुड़ाना", category: "sound", example: "The river murmured softly.", hindiExample: "नदी धीरे-धीरे बड़बड़ाई।", synonyms: ["whisper", "mutter"], antonyms: ["shout"] },
      { word: "Thunder", hindi: "गड़गड़ाहट", category: "sound", example: "Thunder scared the children.", hindiExample: "गड़गड़ाहट से बच्चे डर गए।", synonyms: ["thunderclap", "rumble"], antonyms: [] },
      // Additional Maths
      { word: "Equation", hindi: "समीकरण", category: "maths", example: "x + 5 = 10 is an equation.", hindiExample: "x + 5 = 10 एक समीकरण है।", synonyms: ["formula", "expression"], antonyms: [] },
      { word: "Variable", hindi: "चर / अज्ञात राशि", category: "maths", example: "In algebra, x is a variable.", hindiExample: "बीजगणित में x एक चर है।", synonyms: ["unknown", "symbol"], antonyms: ["constant"] },
      { word: "Constant", hindi: "स्थिरांक", category: "maths", example: "In 2x + 5, 5 is a constant.", hindiExample: "2x + 5 में, 5 एक स्थिरांक है।", synonyms: ["fixed value"], antonyms: ["variable"] },
      { word: "Theorem", hindi: "प्रमेय", category: "maths", example: "Pythagoras theorem relates to right triangles.", hindiExample: "पाइथागोरस प्रमेय समकोण त्रिभुज से संबंधित है।", synonyms: ["proposition", "rule"], antonyms: [] },
      { word: "Matrix", hindi: "आव्यूह / मैट्रिक्स", category: "maths", example: "A matrix is an array of numbers.", hindiExample: "मैट्रिक्स संख्याओं की एक सारणी है।", synonyms: ["array", "grid"], antonyms: [] },
    ],
    testQuestions: [
      { id: 1, question: "'Foreman' in a factory is a:", options: ["Worker", "Supervisor", "Engineer", "Manager"], answer: "Supervisor", type: "mcq" },
      { id: 2, question: "A 'Referee' in sports is a:", options: ["Player", "Spectator", "Judge/Official", "Coach"], answer: "Judge/Official", type: "mcq" },
      { id: 3, question: "'Echo' is a type of:", options: ["Light", "Sound", "Movement", "Colour"], answer: "Sound", type: "mcq" },
      { id: 4, question: "In algebra, x is called:", options: ["Constant", "Variable", "Theorem", "Equation"], answer: "Variable", type: "mcq" },
      { id: 5, question: "Bees make which sound?", options: ["Roar", "Buzz", "Whisper", "Echo"], answer: "Buzz", type: "mcq" },
      { id: 6, question: "'Trophy' is awarded to:", options: ["Losers", "Winners", "Referees", "Coaches"], answer: "Winners", type: "mcq" },
      { id: 7, question: "'Sprint' is a:", options: ["Long distance run", "Short fast run", "Jump", "Throw"], answer: "Short fast run", type: "mcq" },
      { id: 8, question: "Hindi for 'Theorem' is:", options: ["समीकरण", "प्रमेय", "आव्यूह", "चर"], answer: "प्रमेय", type: "mcq" },
      { id: 9, question: "'Murmur' is closest to:", options: ["Shout", "Whisper", "Roar", "Buzz"], answer: "Whisper", type: "mcq" },
      { id: 10, question: "Factory 'Output' means:", options: ["Raw material", "Workers", "Production results", "Machinery"], answer: "Production results", type: "mcq" },
    ],
  },

  // ============================================================
  // DAY 69: APPLICATION WRITING
  // ============================================================
  day69: {
    day: 69,
    title: "Application Writing",
    category: "writing",
    difficulty: "medium",
    duration: 75,
    description: "Complete guide to writing formal applications in English.",
    writingFormat: {
      title: "Format of a Formal Application",
      structure: [
        { part: "Sender's Address", description: "अपना पता (Date के साथ)", example: "12, Gandhi Nagar, Jaipur\n5th January, 2025" },
        { part: "Receiver's Designation & Address", description: "जिसे लिख रहे हैं उसका पद और पता", example: "The Principal,\nSt. Xavier's School,\nJaipur" },
        { part: "Subject", description: "पत्र का विषय (एक पंक्ति में)", example: "Subject: Application for Leave" },
        { part: "Salutation", description: "अभिवादन", example: "Respected Sir/Madam," },
        { part: "Body", description: "मुख्य विषय (3 paragraphs)", subParts: ["Introduction - कारण बताएं", "Main Request - क्या चाहिए", "Conclusion - धन्यवाद"] },
        { part: "Complimentary Close", description: "अंत में", example: "Yours faithfully/obediently," },
        { part: "Signature & Name", description: "हस्ताक्षर और नाम", example: "Rahul Sharma\nClass 10, Roll No. 15" },
      ],
      importantRules: [
        "Always use formal language",
        "Keep it brief and to the point",
        "Subject line should be clear",
        "Mention date always",
        "Use 'Respected' for elders, 'Dear Sir/Madam' for business",
        "End with 'Yours faithfully' for unknown recipients, 'Yours sincerely' for known",
      ],
    },
    samples: [
      {
        id: 1,
        type: "Leave Application - School",
        title: "Application for Sick Leave",
        hindi: "बीमारी के कारण छुट्टी के लिए आवेदन",
        content: `12, Ram Nagar Colony,
Lucknow, UP
10th January, 2025

The Principal,
City Public School,
Lucknow

Subject: Application for Sick Leave

Respected Sir/Madam,

I am writing to inform you that I, Priya Sharma, student of Class 9, Section B, Roll No. 12, am suffering from high fever and throat infection. My doctor has advised me to take complete bed rest for three days.

Therefore, I request you to kindly grant me leave from 10th January to 12th January, 2025. I shall make up for the missed lessons upon my return.

I am attaching the doctor's prescription for your reference.

Yours obediently,
Priya Sharma
Class 9-B, Roll No. 12`,
        keyPoints: ["Mention your class and roll number", "State the reason clearly", "Mention the exact dates", "Attach doctor's certificate if available"],
      },
      {
        id: 2,
        type: "Job Application",
        title: "Application for the Post of English Teacher",
        hindi: "अंग्रेजी शिक्षक पद के लिए आवेदन",
        content: `45, Sector 12,
Noida, UP
15th February, 2025

The Principal,
Modern Public School,
Noida

Subject: Application for the Post of English Teacher

Respected Sir/Madam,

I came to know through the Times of India dated 14th February 2025, that your school requires an English Teacher for Classes 9 and 10. I wish to apply for this position.

I am a B.A. (Honours) English graduate from Delhi University with B.Ed. degree. I have 3 years of teaching experience in a reputed school. I am well-versed in modern teaching methods and communication skills.

I assure you that if given this opportunity, I will work sincerely and contribute to the school's academic growth. My resume and certificates are attached for your kind consideration.

Yours faithfully,
Anjali Singh
Mobile: 9876543210
Email: anjali@email.com`,
        keyPoints: ["Mention where you saw the advertisement", "State your qualifications clearly", "Highlight relevant experience", "Express commitment"],
      },
      {
        id: 3,
        type: "Complaint Application",
        title: "Complaint About Water Supply",
        hindi: "पानी की आपूर्ति के बारे में शिकायत",
        content: `22, Civil Lines,
Agra, UP
20th March, 2025

The Municipal Commissioner,
Agra Municipal Corporation,
Agra

Subject: Complaint Regarding Irregular Water Supply

Respected Sir/Madam,

I, on behalf of the residents of Civil Lines Colony, Agra, wish to bring to your kind notice that our area has been facing a severe water supply problem for the past one month.

Water is supplied only once a week and that too for just two hours. This is causing great inconvenience to the residents, especially to senior citizens and women.

We request you to kindly look into this matter and restore regular water supply at the earliest. We hope you will take prompt action.

Yours faithfully,
Suresh Gupta
President, Residents' Welfare Association
Civil Lines, Agra`,
        keyPoints: ["Mention the specific problem", "Provide details (duration, frequency)", "Represent the affected community", "Request specific action"],
      },
      {
        id: 4,
        type: "Fee Concession Application",
        title: "Application for Fee Concession",
        hindi: "शुल्क में छूट के लिए आवेदन",
        content: `78, Nehru Colony,
Kanpur, UP
5th April, 2025

The Principal,
Government Inter College,
Kanpur

Subject: Application for Fee Concession

Respected Sir/Madam,

I am Vikram Yadav, a student of Class 11 (Science), Roll No. 25. I am writing this application to request a fee concession for this academic year.

My father is a daily wage labourer and our family's financial condition is very poor. Due to these circumstances, paying the full fee is very difficult for us. Despite these hardships, I have always maintained good academic performance.

I request you to kindly consider my application and grant me a fee concession so that I can continue my studies without interruption.

Yours obediently,
Vikram Yadav
Class 11-Science, Roll No. 25`,
        keyPoints: ["Explain financial situation honestly", "Mention academic performance", "Be humble and respectful", "Attach income certificate if available"],
      },
      {
        id: 5,
        type: "Transfer Certificate Application",
        title: "Application for Transfer Certificate",
        hindi: "स्थानांतरण प्रमाण पत्र के लिए आवेदन",
        content: `34, MG Road,
Indore, MP
1st May, 2025

The Principal,
DAV Public School,
Indore

Subject: Application for Transfer Certificate

Respected Sir/Madam,

I am Sunita Verma, a student of Class 8, Section A, Roll No. 8. I am writing this application to request a Transfer Certificate (TC).

My father has been transferred to Mumbai due to his job, and our family will be relocating next month. Therefore, I will need to join a school in Mumbai. Hence, I require my Transfer Certificate and other relevant documents for admission in the new school.

I request you to kindly issue my TC along with my mark sheets and character certificate at the earliest.

Yours obediently,
Sunita Verma
Class 8-A, Roll No. 8`,
        keyPoints: ["State the reason for TC (transfer, relocation)", "Mention documents needed", "Request timely processing"],
      },
      {
        id: 6,
        type: "Application to Bank Manager",
        title: "Application for New Cheque Book",
        hindi: "नई चेक बुक के लिए आवेदन",
        content: `56, Tilak Nagar,
Bhopal, MP
10th June, 2025

The Branch Manager,
State Bank of India,
Tilak Nagar Branch, Bhopal

Subject: Request for Issue of New Cheque Book

Dear Sir/Madam,

I am Rajesh Kumar, holding Savings Account No. 1234567890 in your branch. My existing cheque book has been exhausted and I need a new one urgently for business transactions.

I request you to kindly issue a new cheque book of 25 leaves for the above account at the earliest convenience.

I am attaching the requisition slip for your reference.

Yours faithfully,
Rajesh Kumar
Account No.: 1234567890
Mobile: 9898989898`,
        keyPoints: ["Mention account number", "State reason for urgency if any", "Keep it brief and formal", "Attach requisition form"],
      },
    ],
    commonMistakes: [
      "Writing date in wrong format (Always write: 10th January, 2025)",
      "Forgetting the Subject line",
      "Using 'Dear Sir' instead of 'Respected Sir' for teachers/principals",
      "Writing in casual/informal language",
      "Not mentioning roll number, class in school applications",
      "Forgetting signature and name at the end",
      "Writing too long or unnecessary content",
      "Not mentioning specific dates for leave",
    ],
    practicePrompts: [
      "Write a leave application to your principal for attending a family function for 2 days.",
      "Write an application to the Collector requesting installation of street lights in your area.",
      "Apply for the post of Computer Operator to an IT company.",
      "Write a complaint to your bank about unauthorised transaction in your account.",
      "Apply to your school principal for permission to organise a Science Fair.",
      "Write an application to the Railway Station Master about lost luggage.",
      "Apply to the Municipal Commissioner about garbage collection problems in your colony.",
      "Write an application to your school for issuing a character certificate.",
      "Apply to an NGO for volunteering opportunity during summer vacations.",
      "Write an application to the District Education Officer about teacher shortage in your school.",
      "Apply for a sports scholarship to the Sports Authority.",
      "Write a complaint application to the police about street harassment.",
      "Apply to a hospital for a medical certificate.",
      "Write an application to your employer for maternity leave.",
      "Apply to the Forest Department for tree plantation in your locality.",
      "Write a request to the library for extending the book return date.",
      "Apply to your principal for starting a Computer Club in school.",
      "Write an application to the Water Works Department about water leakage.",
      "Apply for a loan to a bank manager.",
      "Write a complaint about bad road conditions to the PWD (Public Works Department).",
    ],
    tips: [
      "Read the prompt carefully before writing",
      "Plan your application in 3 parts: Introduction, Main Request, Conclusion",
      "Use connecting words: Therefore, Hence, Thus, However, Furthermore",
      "Always use a polite tone even in complaints",
      "Keep sentences short and clear",
      "Proofread before submitting",
      "Use passive voice for formal tone: 'It is requested that...'",
      "Don't use contractions (can't, won't) in formal writing",
    ],
  },

  // ============================================================
  // DAY 70: LETTER WRITING
  // ============================================================
  day70: {
    day: 70,
    title: "Letter Writing",
    category: "writing",
    difficulty: "medium",
    duration: 75,
    description: "Complete guide to formal and informal letter writing in English.",
    writingFormat: {
      formalLetter: {
        title: "Format of Formal Letter",
        structure: ["Sender's Address", "Date", "Receiver's Address", "Subject", "Salutation", "Body (3 paragraphs)", "Complimentary Close", "Signature"],
        salutations: ["Dear Sir/Madam", "Respected Sir/Madam", "To Whom It May Concern"],
        closings: ["Yours faithfully (unknown person)", "Yours sincerely (known person)", "Yours truly", "With regards"],
        usedFor: ["Complaint letters", "Business letters", "Official correspondence", "Letters to newspapers", "Letters to government offices"],
      },
      informalLetter: {
        title: "Format of Informal Letter",
        structure: ["Sender's Address", "Date", "Salutation (Dear + Name)", "Body", "Closing", "Signature"],
        salutations: ["Dear Rahul", "Dear Mummy", "My dear friend", "Dearest Sister"],
        closings: ["Yours lovingly", "Your friend", "With lots of love", "Affectionately yours"],
        usedFor: ["Letters to friends", "Letters to family", "Personal correspondence"],
      },
    },
    samples: [
      {
        id: 1,
        type: "Formal - Complaint to Newspaper",
        title: "Letter to the Editor about Noise Pollution",
        content: `A-22, Model Town,
Delhi - 110009
12th January, 2025

The Editor,
The Hindustan Times,
New Delhi

Subject: Noise Pollution Caused by Loudspeakers

Dear Sir/Madam,

Through the columns of your esteemed newspaper, I wish to draw the attention of the concerned authorities towards the increasing menace of noise pollution in our city, particularly due to the excessive use of loudspeakers at religious gatherings and social functions.

The loud and continuous use of loudspeakers until late at night disturbs the sleep of residents, affects students who are preparing for examinations, and is particularly harmful to elderly and sick people. Despite several complaints to local authorities, no effective action has been taken.

I request the authorities to strictly implement the existing sound pollution laws and ensure that loudspeakers are not used beyond 10 PM. I hope your reputed publication will help in highlighting this issue.

Yours faithfully,
Meera Joshi`,
        keyPoints: ["Start with 'Through the columns of your...'", "State the problem clearly", "Suggest solutions", "End with hope for action"],
      },
      {
        id: 2,
        type: "Formal - Business Letter",
        title: "Order Letter to a Supplier",
        content: `M/s Sharma Electronics,
45, Industrial Area,
Pune - 411001
5th February, 2025

M/s Kumar Wholesale Traders,
12, Wholesale Market,
Mumbai - 400001

Subject: Order for Electronic Goods

Dear Sir/Madam,

We are pleased to place an order for the following items as per the price list received from you on 1st February, 2025:

1. LED Televisions (32 inch) - 50 pieces @ Rs. 12,000 each
2. Bluetooth Speakers - 100 pieces @ Rs. 800 each
3. Mobile Chargers (5A) - 200 pieces @ Rs. 250 each

Please ensure that all goods are packed properly and dispatched within 7 working days. Payment will be made by demand draft on receipt of goods.

We look forward to your prompt delivery and a long-term business relationship.

Yours faithfully,
Amit Sharma
Manager, M/s Sharma Electronics`,
        keyPoints: ["Mention order details clearly", "State quantity and price", "Mention delivery timeline", "State payment terms"],
      },
      {
        id: 3,
        type: "Informal - To Friend",
        title: "Letter to Friend Describing Your City",
        content: `23, Shivaji Nagar,
Nagpur - 440001
20th March, 2025

Dear Rahul,

Hope this letter finds you in the best of health. I am also fine here and missing you a lot.

You mentioned in your last letter that you were planning to visit Nagpur. I am very excited about your visit. Let me tell you about some places you must visit here. Nagpur is famous for its oranges - you must try fresh orange juice from the markets near Sitabuldi. The Deekshabhoomi is a magnificent Buddhist monument and definitely worth visiting. We can also visit the Ambazari Lake in the evening - it is breathtakingly beautiful at sunset.

During your stay, we can also visit the zero mile stone, which marks the geographical centre of India. I have already planned a special welcome dinner at my house. My mother will prepare your favourite dishes.

Please let me know your travel plans so I can arrange everything accordingly. Write back soon.

Your friend,
Sanjay`,
        keyPoints: ["Use friendly, warm language", "Share personal details", "Ask about the other person", "Use first names"],
      },
      {
        id: 4,
        type: "Informal - To Parents",
        title: "Letter to Parents from Hostel",
        content: `Room 12, Boys Hostel,
IIT Delhi Campus,
New Delhi - 110016
15th April, 2025

My dear Mummy and Papa,

Pranam. I hope you both are in good health. I am also well and studying hard.

I am writing to tell you that I have settled well in the hostel. The food here is good but it does not match your cooking. My roommate Arjun is very helpful and we have become good friends. Classes are going well and my professors are excellent teachers.

I want to inform you that my mid-semester examinations are in the last week of April. Please pray for me. I will study hard and make you both proud.

Also, I need a new pair of shoes as my old ones have worn out. Please send Rs. 2000 at your convenience.

I will call you on Sunday. Give my love and regards to all at home.

Your loving son,
Rohan`,
        keyPoints: ["Begin with 'Pranam' or respectful greeting for parents", "Give news about yourself", "Ask about family", "Be affectionate"],
      },
      {
        id: 5,
        type: "Formal - Letter to Employer",
        title: "Letter Resigning from Job",
        content: `Sunita Patel,
56, Lake View Society,
Ahmedabad - 380015
30th May, 2025

The Human Resources Manager,
Infosys Limited,
Ahmedabad Office

Subject: Resignation Letter

Dear Sir/Madam,

I am writing to formally inform you of my decision to resign from my position as Senior Software Developer, effective from 30th June, 2025. I am providing one month's notice as per my employment contract.

I have thoroughly enjoyed my four years at Infosys and am grateful for the opportunities for professional growth and development that I have been given. The projects I have worked on and the colleagues I have worked with have been truly valuable experiences.

I will do my best to wrap up my current projects and assist in the transition of my responsibilities to ensure a smooth handover to my successor.

I request you to kindly process my relieving letter and experience certificate at the earliest. I wish the company and my colleagues continued success.

Yours sincerely,
Sunita Patel`,
        keyPoints: ["Give adequate notice period", "Thank employer for opportunities", "Offer to help with transition", "Request clearance documents"],
      },
    ],
    commonMistakes: [
      "Not following proper format (address, date, subject)",
      "Using informal language in formal letters",
      "Writing too long letters - keep it concise",
      "Wrong closing - 'Yours faithfully' for unknown, 'Yours sincerely' for known",
      "Not writing the subject line in formal letters",
      "Forgetting to sign with full name",
      "Not mentioning the date",
      "Using abbreviations (don't, can't) in formal letters",
    ],
    practicePrompts: [
      "Write a formal letter to the editor about increasing traffic problems in your city.",
      "Write an informal letter to your cousin inviting him/her to your birthday party.",
      "Write a formal letter to the railway authority about poor facilities in trains.",
      "Write a letter to your friend describing your experience at a national park.",
      "Write a formal complaint letter to the health department about a dirty pond.",
      "Write a letter to your old teacher thanking him/her for your success.",
      "Write a formal letter requesting a donation for a school charity event.",
      "Write an informal letter to your pen pal describing Indian festivals.",
      "Write a formal letter to the electricity department about frequent power cuts.",
      "Write an informal letter to your brother advising him about career choices.",
      "Write a formal letter to the police about suspicious activities in your area.",
      "Write a letter to your grandmother describing your school sports day.",
      "Write a formal letter to an author whose book you admired.",
      "Write an informal letter congratulating your friend on his/her examination success.",
      "Write a formal letter to a hotel booking a room for a family stay.",
      "Write an informal letter to your friend describing a movie you recently watched.",
      "Write a formal complaint to an airline about lost baggage.",
      "Write a letter to your parent from a study tour.",
      "Write a formal letter to a publisher requesting their book catalogue.",
      "Write an informal letter to your childhood friend after many years.",
    ],
  },

  // ============================================================
  // DAY 71: E-MAIL WRITING
  // ============================================================
  day71: {
    day: 71,
    title: "E-mail Writing",
    category: "writing",
    difficulty: "medium",
    duration: 75,
    description: "Complete guide to professional email writing - all types with formats and samples.",
    writingFormat: {
      emailComponents: [
        { part: "To:", description: "Recipient's email address" },
        { part: "CC:", description: "Carbon Copy - others who should see the email" },
        { part: "BCC:", description: "Blind Carbon Copy - hidden recipients" },
        { part: "Subject:", description: "Brief, clear title of the email" },
        { part: "Salutation", description: "Dear Mr./Ms./Dr. [Last Name] or Dear Sir/Madam" },
        { part: "Opening Line", description: "Purpose of the email in one sentence" },
        { part: "Body", description: "Main content - clear and concise paragraphs" },
        { part: "Closing", description: "Action required or next steps" },
        { part: "Sign-off", description: "Regards, Best regards, Sincerely, Yours faithfully" },
        { part: "Signature", description: "Full name, designation, company, phone number" },
      ],
      rules: [
        "Subject line should be specific and informative",
        "First sentence should state the purpose",
        "Use bullet points for lists",
        "Keep paragraphs short (3-4 lines)",
        "End with a clear call to action",
        "Proofread before sending",
        "Avoid ALL CAPS (means shouting)",
        "Reply within 24 hours for professional emails",
        "Use 'Reply All' carefully",
      ],
    },
    samples: [
      {
        id: 1,
        type: "Job Application Email",
        title: "Applying for a Job via Email",
        content: `To: hr@techsolutions.com
CC: careers@techsolutions.com
Subject: Application for the Position of Marketing Manager - Ref: TM2025

Dear Hiring Manager,

I am writing to express my interest in the Marketing Manager position advertised on your company website on 10th January, 2025.

I have over 5 years of experience in digital marketing and brand management with leading FMCG companies. In my current role at ABC Marketing Pvt. Ltd., I have successfully:
• Increased digital engagement by 150% in one year
• Managed a team of 8 marketing professionals
• Launched 12 successful product campaigns

I am passionate about data-driven marketing and have expertise in SEO, social media, and content marketing. I believe my skills align well with Tech Solutions' dynamic work environment.

Please find my resume attached for your consideration. I would welcome the opportunity for an interview to discuss how I can contribute to your team.

Thank you for considering my application.

Best regards,
Kavya Reddy
Mobile: 9876543210
Email: kavya.reddy@gmail.com
LinkedIn: linkedin.com/in/kavyareddy`,
        keyPoints: ["Mention the job title and reference in subject", "State experience with specific achievements", "Use bullet points for key skills", "Attach resume"],
      },
      {
        id: 2,
        type: "Follow-up Email",
        title: "Follow-up after Job Interview",
        content: `To: priya.sharma@company.com
Subject: Thank You - Interview for Data Analyst Position - 15th January 2025

Dear Ms. Sharma,

Thank you for taking the time to meet with me yesterday to discuss the Data Analyst position at XYZ Corporation. It was a pleasure learning more about the role and the exciting projects your team is working on.

Our conversation about the machine learning initiatives particularly excited me, and I believe my experience with Python and data visualization tools would be valuable to your team.

I remain very interested in this opportunity and am confident that my skills and enthusiasm would make me a strong addition to your organization.

Please let me know if you need any additional information. I look forward to hearing from you.

Warm regards,
Ashok Sharma
Phone: 9123456789`,
        keyPoints: ["Send within 24 hours of interview", "Thank them specifically", "Reinforce your interest", "Keep it short"],
      },
      {
        id: 3,
        type: "Professional Request Email",
        title: "Requesting Meeting with Client",
        content: `To: rajesh.kapoor@clientcompany.com
CC: manager@mycompany.com
Subject: Request for Meeting - Q1 Project Review

Dear Mr. Kapoor,

I hope this email finds you well. I am writing to request a brief meeting to discuss the progress and next steps for Project Alpha.

I would like to review:
1. Current project milestones and deliverables
2. Any challenges or concerns
3. Timeline adjustments if necessary
4. Resource allocation for Q2

Would you be available for a 30-minute meeting this week? I am flexible on timing and can adjust according to your schedule. Alternatively, I can also arrange a video call if in-person is not convenient.

Please let me know your preferred date and time, and I will send a calendar invitation promptly.

Thank you for your time.

Best regards,
Neha Gupta
Project Manager
ABC Technologies Pvt. Ltd.
Phone: 022-12345678`,
        keyPoints: ["State purpose clearly", "Provide agenda items", "Offer flexibility in timing", "Make it easy for recipient to respond"],
      },
      {
        id: 4,
        type: "Complaint Email",
        title: "Complaint to Customer Service",
        content: `To: customercare@shoppingsite.com
Subject: Complaint Regarding Wrong Product Delivered - Order #ORD-987654

Dear Customer Service Team,

I am writing to report an issue with my recent order. I ordered a Blue Cotton Shirt (Size L) on 5th January 2025 (Order ID: ORD-987654), but I received a Red Synthetic Shirt (Size M) instead.

The wrong product has caused me inconvenience as I needed the shirt for an important event on 15th January. This is not the first time I have faced such an issue with your company.

I request you to:
1. Arrange an immediate pickup of the wrong item
2. Deliver the correct product within 3 working days
3. Provide a discount coupon as compensation for the inconvenience caused

I have attached photographs of the received item for your reference. I expect a prompt response and resolution to this matter.

If this is not resolved within 48 hours, I will be compelled to share my experience on consumer review platforms.

Regards,
Pooja Mishra
Customer ID: CUST-12345
Phone: 9988776655`,
        keyPoints: ["Include order number", "Describe problem specifically", "State what resolution you expect", "Set a deadline for response", "Attach evidence"],
      },
      {
        id: 5,
        type: "Official Communication",
        title: "Email Requesting Leave Approval",
        content: `To: manager@company.com
CC: hr@company.com
Subject: Leave Application - 20th January to 22nd January 2025

Dear Mr. Rathore,

I am writing to request leave for three days, from 20th January (Monday) to 22nd January (Wednesday) 2025.

The reason for my absence is that my younger sister's wedding is scheduled on 21st January, and I need to be present for the pre-wedding preparations and ceremony.

I have completed all pending tasks related to the current project. The weekly report is ready and will be shared before I leave. In case of any urgent requirements, my colleague Ravi Kumar (Ext. 2234) has agreed to assist.

I will be available on phone for any emergencies during my leave period.

I request your kind approval for the same.

Thank you,
Sunil Verma
Software Developer
Employee Code: EMP-4567
Phone: 9854321076`,
        keyPoints: ["Give sufficient advance notice", "State reason clearly", "Mention work coverage plan", "Offer to be available for emergencies"],
      },
      {
        id: 6,
        type: "Congratulatory Email",
        title: "Congratulating Colleague on Promotion",
        content: `To: pradeep.sharma@company.com
Subject: Congratulations on Your Well-Deserved Promotion!

Dear Pradeep,

I just heard the wonderful news about your promotion to Senior Manager! This is truly a well-deserved recognition of your hard work and dedication.

It has been a privilege working alongside you for the past three years. Your leadership, problem-solving skills, and ability to inspire the team have always been exceptional. The way you handled the XYZ project last year was truly impressive.

I am confident that you will excel in your new role and continue to lead by example. The team is lucky to have you.

Looking forward to celebrating with you at the team lunch on Friday!

Warm regards,
Deepika Nair`,
        keyPoints: ["Be genuine and specific", "Mention specific qualities or achievements", "Keep positive tone", "Suggest a celebration if appropriate"],
      },
    ],
    commonMistakes: [
      "Vague subject line like 'Hello' or 'Important'",
      "Starting with 'I' in the first sentence",
      "Long, unstructured paragraphs",
      "Using casual language in professional emails (gonna, wanna)",
      "Forgetting to attach files mentioned in email",
      "Spelling mistakes and grammatical errors",
      "Not including contact details in signature",
      "CC-ing irrelevant people",
      "Replying to all when only one person needs the reply",
      "Writing in ALL CAPITALS",
    ],
    practicePrompts: [
      "Write an email to your professor requesting an extension for your assignment.",
      "Write a professional email to a client introducing your company's new service.",
      "Write a follow-up email after submitting a business proposal.",
      "Write an email to your team informing them about a new company policy.",
      "Write an email complaining about a defective product to a company.",
      "Write a thank-you email to a recruiter after a job interview.",
      "Write an email requesting a refund for a cancelled event.",
      "Write an email to a vendor requesting a price quotation.",
      "Write an email congratulating a colleague on completing 10 years at the company.",
      "Write an email to your boss about a problem in the office that needs attention.",
      "Write an email introducing yourself to a new team.",
      "Write a formal email declining a job offer politely.",
      "Write an email requesting feedback on a submitted report.",
      "Write an email to your college alumni group about an upcoming reunion.",
      "Write an email to a hotel requesting a special arrangement for a family stay.",
      "Write an email requesting a recommendation letter.",
      "Write a professional email to reschedule a meeting.",
      "Write an email to announce a new employee to the team.",
      "Write an email requesting collaboration on a research project.",
      "Write an email to a newspaper editor about an article you found inspiring.",
    ],
  },

  // ============================================================
  // DAY 72: PARAGRAPH WRITING
  // ============================================================
  day72: {
    day: 72,
    title: "Paragraph Writing",
    category: "writing",
    difficulty: "medium",
    duration: 70,
    description: "How to write well-structured, coherent paragraphs in English.",
    writingFormat: {
      structure: {
        title: "Structure of a Good Paragraph",
        parts: [
          { name: "Topic Sentence", description: "First sentence that states the main idea of the paragraph", example: "Pollution is one of the most serious threats to our environment." },
          { name: "Supporting Sentences", description: "3-5 sentences that explain, support, or give examples", example: "Air pollution from vehicles causes respiratory diseases. Water pollution destroys aquatic life. Soil pollution affects agriculture." },
          { name: "Concluding Sentence", description: "Last sentence that wraps up the paragraph and gives a conclusion or call to action", example: "Therefore, it is our collective responsibility to reduce pollution and protect our environment." },
        ],
        tips: [
          "One paragraph = One main idea",
          "Keep sentences clear and simple",
          "Use transition words: However, Therefore, Moreover, Furthermore, In addition",
          "Avoid repetition",
          "Maintain consistent tense throughout",
          "Paragraph length: 5-8 sentences for school level",
        ],
      },
    },
    samples: [
      {
        id: 1,
        topic: "Benefits of Reading Books",
        paragraph: `Reading books is one of the most beneficial habits a person can develop. Books expand our knowledge and vocabulary, exposing us to ideas and concepts we may never encounter in daily life. They improve concentration and focus, as reading requires sustained attention. Fiction books develop empathy by allowing us to experience different lives and perspectives. Non-fiction books provide factual knowledge about history, science, and the world. Moreover, reading before bed helps reduce stress and promotes better sleep. Unlike watching television or scrolling through social media, reading is an active mental exercise that keeps the mind sharp. Therefore, developing a regular reading habit is an investment in our intellectual growth and mental well-being.`,
        analysis: { topicSentence: "Reading books is one of the most beneficial habits a person can develop.", supportingIdeas: ["Expands knowledge and vocabulary", "Improves concentration", "Develops empathy", "Provides factual knowledge", "Reduces stress"], conclusion: "Reading is an investment in intellectual growth and mental well-being." },
      },
      {
        id: 2,
        topic: "Importance of Physical Exercise",
        paragraph: `Regular physical exercise is essential for maintaining good health and a balanced lifestyle. Exercise strengthens the heart and improves blood circulation, reducing the risk of cardiovascular diseases. It helps maintain a healthy body weight by burning calories and increasing metabolism. Physical activity also releases endorphins, the brain's natural mood-elevating chemicals, which reduce stress, anxiety, and depression. Regular exercise improves bone density and muscle strength, reducing the risk of osteoporosis and injuries. Furthermore, people who exercise regularly tend to sleep better and have higher energy levels throughout the day. Even simple activities like walking, cycling, or yoga for 30 minutes daily can make a significant difference. In conclusion, incorporating regular exercise into our daily routine is one of the best investments we can make for our long-term health.`,
        analysis: { topicSentence: "Regular physical exercise is essential for maintaining good health.", supportingIdeas: ["Strengthens heart", "Maintains weight", "Releases endorphins", "Improves bone density", "Better sleep"], conclusion: "Exercise is one of the best investments for long-term health." },
      },
      {
        id: 3,
        topic: "Digital Technology in Education",
        paragraph: `Digital technology has revolutionized the way education is delivered and received around the world. With the introduction of smart boards, online learning platforms, and digital textbooks, learning has become more interactive and accessible. Students in remote areas can now access quality education through the internet, breaking down geographical barriers. Educational apps and videos make complex concepts easier to understand through visual demonstrations. Furthermore, digital tools allow teachers to track student progress and provide personalized learning experiences. However, excessive screen time and distractions from social media can negatively impact students' focus and mental health. Despite these challenges, when used thoughtfully, digital technology has the potential to create a more inclusive, effective, and engaging educational system for students worldwide.`,
        analysis: { topicSentence: "Digital technology has revolutionized education.", supportingIdeas: ["Interactive learning", "Accessible to remote areas", "Visual demonstrations", "Personalized learning"], conclusion: "Thoughtful use of technology creates a more inclusive education system." },
      },
      {
        id: 4,
        topic: "My Role Model",
        paragraph: `Dr. A.P.J. Abdul Kalam, the former President of India, has been my greatest inspiration and role model throughout my life. Born into a humble family in Rameswaram, Tamil Nadu, he rose through sheer determination and hard work to become India's most celebrated scientist. He was the chief architect of India's missile programme and played a pivotal role in the Pokhran nuclear tests. What inspires me most about him is his simplicity, humility, and his unwavering love for young people. Despite holding the highest constitutional position in the country, he lived a simple life and always motivated youth to dream big. His famous words, "Dream, dream, dream! Dreams transform into thoughts and thoughts result in action," have always pushed me to work harder and aim higher. He truly embodied the belief that any goal can be achieved through hard work, integrity, and a positive attitude.`,
        analysis: { topicSentence: "Dr. A.P.J. Abdul Kalam has been my greatest inspiration.", supportingIdeas: ["Humble origins to great achievements", "Missile programme architect", "Simplicity and humility", "Motivation for youth"], conclusion: "He embodied the belief that any goal can be achieved through hard work." },
      },
    ],
    practicePrompts: [
      "Write a paragraph on 'The Importance of Trees'.",
      "Write a paragraph on 'My Favourite Festival'.",
      "Write a paragraph on 'The Benefits of Yoga'.",
      "Write a paragraph on 'Online Shopping: Advantages and Disadvantages'.",
      "Write a paragraph on 'The Importance of Saving Money'.",
      "Write a paragraph on 'Water Conservation'.",
      "Write a paragraph on 'The Role of Media in Society'.",
      "Write a paragraph on 'Travelling as a Source of Learning'.",
      "Write a paragraph on 'My Dream Career'.",
      "Write a paragraph on 'The Advantages of Learning English'.",
      "Write a paragraph on 'Mobile Phones: A Boon or a Bane'.",
      "Write a paragraph on 'Women Empowerment in India'.",
      "Write a paragraph on 'The Importance of Discipline'.",
      "Write a paragraph on 'My Favourite Season'.",
      "Write a paragraph on 'Climate Change and Global Warming'.",
      "Write a paragraph on 'The Impact of Social Media on Youth'.",
      "Write a paragraph on 'Indian Culture and Heritage'.",
      "Write a paragraph on 'Sports and Its Importance'.",
      "Write a paragraph on 'The Value of Time'.",
      "Write a paragraph on 'Science and Technology: Progress and Responsibility'.",
    ],
    commonMistakes: [
      "Starting paragraph without a clear topic sentence",
      "Including multiple unrelated ideas in one paragraph",
      "No concluding sentence",
      "Inconsistent verb tenses",
      "Repeating the same word multiple times",
      "Very short paragraphs (only 2-3 sentences)",
      "Starting every sentence the same way",
      "Not using transition words to connect ideas",
    ],
  },

  // ============================================================
  // DAY 73: NOTICE WRITING + WRITING SKILLS PRACTICE
  // ============================================================
  day73: {
    day: 73,
    title: "Notice Writing + Writing Skills Practice",
    category: "writing",
    difficulty: "medium",
    duration: 70,
    description: "Guide to notice writing and comprehensive writing skills practice.",
    writingFormat: {
      noticeFormat: {
        title: "Format of a Notice",
        structure: [
          { part: "Organisation Name", description: "Name of school, college, or organization on top", example: "Delhi Public School, Rohini" },
          { part: "NOTICE", description: "Word 'NOTICE' in capital letters, centered", example: "NOTICE" },
          { part: "Date", description: "Date of issue", example: "12th January, 2025" },
          { part: "Title/Subject", description: "What the notice is about (underlined)", example: "Annual Sports Day Celebration" },
          { part: "Body", description: "Details - Who, What, When, Where", example: "All students are hereby informed that..." },
          { part: "Signature", description: "Name and designation", example: "Suresh Kumar\nHead Boy / Teacher Incharge" },
        ],
        importantPoints: [
          "Write in third person (Students are informed...)",
          "Keep it brief and informative",
          "Mention: Date, Time, Venue, Who should attend",
          "Use formal language",
          "Box the notice or underline the heading",
          "Word limit: Usually 50-80 words",
        ],
      },
    },
    samples: [
      {
        id: 1,
        type: "School Notice",
        title: "Notice for Annual Sports Day",
        content: `DELHI PUBLIC SCHOOL
NOTICE
12th January, 2025

Annual Sports Day

This is to inform all students of Classes 6 to 12 that the Annual Sports Day will be held on 25th January, 2025 (Saturday) at the School Ground from 9:00 AM to 4:00 PM.

Students who wish to participate in running, jumping, and throwing events must register their names with their respective Physical Education teachers by 18th January, 2025.

All students are expected to be present in proper sports uniform. Parents and guardians are cordially invited to attend.

Rohit Sharma
Sports Captain`,
        keyPoints: ["Clear date and venue", "Registration deadline", "Dress code mentioned", "Parents invited"],
      },
      {
        id: 2,
        type: "Society Notice",
        title: "Notice for Society Meeting",
        content: `GREEN VALLEY HOUSING SOCIETY
NOTICE
5th February, 2025

General Body Meeting

All residents of Green Valley Housing Society are hereby notified that a General Body Meeting will be held on 15th February, 2025 (Saturday) at 6:00 PM in the Society Community Hall.

The agenda for the meeting includes:
1. Review of maintenance charges
2. Proposal for installation of CCTV cameras
3. Discussion on garden renovation

All flat owners are requested to attend the meeting. Proxy attendance is allowed with written authorization.

Ramesh Gupta
Secretary
Green Valley Housing Society`,
        keyPoints: ["List agenda items", "State venue and time", "Mention proxy rules if any"],
      },
      {
        id: 3,
        type: "College Notice",
        title: "Notice for Seminar",
        content: `DELHI UNIVERSITY
NOTICE
20th March, 2025

National Seminar on Environmental Awareness

The Department of Environmental Studies, Delhi University, is organizing a National Seminar on "Environmental Awareness and Sustainable Development" on 5th April, 2025 from 10:00 AM to 5:00 PM in the University Auditorium.

Eminent scientists, environmentalists, and policymakers will be the speakers. Students from all departments are invited to attend. Registration forms are available at the Department office. Last date for registration: 28th March, 2025.

A certificate of participation will be awarded to all registered participants.

Dr. Anita Rao
Head, Department of Environmental Studies`,
        keyPoints: ["Mention speakers/guests", "Registration details", "Certificate incentive"],
      },
      {
        id: 4,
        type: "School Notice - Lost and Found",
        title: "Notice for Lost Item",
        content: `KENDRIYA VIDYALAYA, PATNA
NOTICE
8th April, 2025

Lost Property

This is to inform all students and staff that a black leather wallet containing some cash, identity cards, and an ATM card was found near the school library on 7th April, 2025.

The owner may claim the wallet by providing proper identification to the School Office within 3 working days.

Items not claimed within the stipulated time will be deposited with the Principal's Office.

Geeta Singh
Class Monitor, Class 10-B`,
        keyPoints: ["Describe lost/found item", "Where and when found", "How to claim", "Deadline for claiming"],
      },
    ],
    writingSkillsPractice: {
      essayWritingTips: [
        "Start with a compelling introduction (hook the reader)",
        "Each paragraph should have one main idea",
        "Use examples, statistics, or stories to support points",
        "Balance both sides (advantages and disadvantages) for discursive essays",
        "End with a strong conclusion that reflects on the introduction",
        "Word limit for school essays: 200-250 words; college: 350-400 words",
      ],
      essayTypes: [
        { type: "Descriptive Essay", description: "Describes a person, place, or thing in detail", tips: "Use sensory details (what you see, hear, smell, feel).", example: "My Hometown" },
        { type: "Narrative Essay", description: "Tells a story or personal experience", tips: "Use first person (I), chronological order, include dialogue.", example: "An Unforgettable Incident" },
        { type: "Expository Essay", description: "Explains a topic with facts and information", tips: "Be objective, use facts and examples.", example: "How Solar Energy Works" },
        { type: "Argumentative Essay", description: "Argues a position or opinion with evidence", tips: "State your position clearly, counter opposing views.", example: "Should Homework Be Banned?" },
      ],
    },
    practicePrompts: [
      "Write a notice for your school about a Book Fair.",
      "Write a notice for a colony about a blood donation camp.",
      "Write a notice for students about a debate competition.",
      "Write a notice about a school picnic.",
      "Write a notice about the cancellation of a class.",
      "Write a notice about elections for the student council.",
      "Write a short essay on 'The Value of Education'.",
      "Write a short essay on 'India: The Land of Diversity'.",
      "Write a short essay on 'The Importance of Cleanliness'.",
      "Write a descriptive paragraph about your school.",
      "Write a narrative paragraph about the best day of your life.",
      "Write an argumentative paragraph about whether mobile phones should be banned in schools.",
      "Write a notice for your office about a fire safety drill.",
      "Write a notice for a workshop on communication skills.",
      "Write a notice about a charity fundraiser event.",
      "Write a paragraph explaining how to stay healthy.",
      "Write a paragraph about your vision for India in 2050.",
      "Write a short essay on 'Corruption: A Social Evil'.",
      "Write a notice about a cultural programme.",
      "Write a paragraph on 'The Best Advice I Ever Received'.",
    ],
  },

  // ============================================================
  // DAY 74: GRAMMAR + VOCABULARY + SPEAKING FULL REVISION
  // ============================================================
  day74: {
    day: 74,
    title: "Grammar + Vocabulary + Speaking Full Revision",
    category: "revision",
    difficulty: "hard",
    duration: 120,
    description: "Complete revision of all grammar rules, vocabulary, and speaking tips from Days 1-73.",
    grammarRevision: {
      tenses: [
        { tense: "Simple Present", formula: "Subject + V1 + Object", example: "She reads books.", usage: "Habitual actions, facts, universal truths" },
        { tense: "Present Continuous", formula: "Subject + am/is/are + V-ing + Object", example: "She is reading a book.", usage: "Actions happening right now" },
        { tense: "Present Perfect", formula: "Subject + has/have + V3 + Object", example: "She has read the book.", usage: "Completed actions with present relevance" },
        { tense: "Present Perfect Continuous", formula: "Subject + has/have been + V-ing + Object", example: "She has been reading for 2 hours.", usage: "Actions continuing from past to present" },
        { tense: "Simple Past", formula: "Subject + V2 + Object", example: "She read a book.", usage: "Completed actions in the past" },
        { tense: "Past Continuous", formula: "Subject + was/were + V-ing + Object", example: "She was reading a book.", usage: "Actions in progress at a past time" },
        { tense: "Past Perfect", formula: "Subject + had + V3 + Object", example: "She had read the book.", usage: "Actions completed before another past action" },
        { tense: "Simple Future", formula: "Subject + will + V1 + Object", example: "She will read a book.", usage: "Future actions, predictions" },
        { tense: "Future Perfect", formula: "Subject + will have + V3 + Object", example: "She will have read the book by 5 PM.", usage: "Actions completed before a future time" },
      ],
      articles: {
        title: "Articles: A, An, The",
        rules: [
          "'A' - before consonant sounds: a book, a university",
          "'An' - before vowel sounds: an apple, an hour",
          "'The' - specific/already known: the Taj Mahal, the book I told you about",
          "No article - plural nouns (general): Dogs are loyal.",
          "No article - uncountable nouns (general): Water is essential.",
        ],
      },
      prepositions: {
        title: "Common Prepositions",
        list: [
          { preposition: "In", usage: "in a box, in Delhi, in the morning, in January, in 2025" },
          { preposition: "On", usage: "on the table, on Monday, on 5th January, on the road" },
          { preposition: "At", usage: "at home, at 5 PM, at the station" },
          { preposition: "By", usage: "by car, by 5 PM (deadline), by Ravi (passive)" },
          { preposition: "For", usage: "for 3 hours (duration), for you (purpose)" },
          { preposition: "Since", usage: "since 2020, since morning (starting point)" },
          { preposition: "With", usage: "with a pen, with happiness (accompaniment/instrument)" },
        ],
      },
      modals: {
        title: "Modal Verbs",
        list: [
          { modal: "Can", usage: "Ability (present): I can swim." },
          { modal: "Could", usage: "Ability (past), polite request: Could you help me?" },
          { modal: "May", usage: "Permission, possibility: You may go. It may rain." },
          { modal: "Might", usage: "Less certain possibility: He might come." },
          { modal: "Must", usage: "Obligation, certainty: You must obey rules. He must be tired." },
          { modal: "Should", usage: "Advice, suggestion: You should exercise daily." },
          { modal: "Would", usage: "Polite request, past habit: Would you help? He would sing daily." },
          { modal: "Shall", usage: "Future (I/We), suggestion: Shall we go?" },
          { modal: "Will", usage: "Future certainty, willingness: I will help you." },
          { modal: "Need", usage: "Necessity: You need not worry." },
          { modal: "Dare", usage: "Challenge: How dare he say that!" },
          { modal: "Used to", usage: "Past habit: I used to play cricket." },
        ],
      },
      activePasive: {
        title: "Active and Passive Voice",
        rule: "Active: Subject + Verb + Object | Passive: Object + be + V3 + by + Subject",
        examples: [
          { active: "Ram eats mangoes.", passive: "Mangoes are eaten by Ram." },
          { active: "She wrote a letter.", passive: "A letter was written by her." },
          { active: "They will build a bridge.", passive: "A bridge will be built by them." },
        ],
      },
      directIndirect: {
        title: "Direct and Indirect Speech",
        rules: [
          "Direct → Indirect: Change tenses (present → past, past → past perfect)",
          "Change pronouns: I → he/she, we → they",
          "Change time expressions: now → then, today → that day, tomorrow → next day",
          "Say/Says: use 'say/said'",
          "Tell/Told: use 'tell/told' with person",
        ],
        examples: [
          { direct: "He said, 'I am happy.'", indirect: "He said that he was happy." },
          { direct: "She said, 'I will come tomorrow.'", indirect: "She said that she would come the next day." },
        ],
      },
    },
    vocabularyRevision: {
      title: "500+ Key Words Revision",
      categories: [
        { category: "Nouns (People)", words: ["Teacher", "Engineer", "Lawyer", "Doctor", "Farmer", "Journalist", "Architect", "Scientist", "Accountant", "Pilot", "Chef", "Banker", "Artist", "Judge", "Astronaut"] },
        { category: "Nouns (Abstracts)", words: ["Integrity", "Resilience", "Wisdom", "Humility", "Gratitude", "Perseverance", "Compassion", "Devotion", "Innovation", "Justice", "Harmony", "Freedom", "Courage", "Patience", "Ambition"] },
        { category: "Adjectives", words: ["Adamant", "Benevolent", "Cautious", "Diligent", "Eloquent", "Fervent", "Generous", "Honest", "Industrious", "Judicious", "Keen", "Lenient", "Meticulous", "Obedient", "Prudent"] },
        { category: "Weather Words", words: ["Sunny", "Cloudy", "Rainy", "Windy", "Foggy", "Stormy", "Humid", "Drought", "Flood", "Thunder", "Lightning", "Snow", "Hail", "Monsoon", "Cyclone"] },
        { category: "Food Words", words: ["Appetizer", "Cuisine", "Recipe", "Ingredient", "Aroma", "Flavour", "Nutrition", "Vegetarian", "Organic", "Feast", "Marinate", "Garnish", "Crispy", "Tender", "Bland"] },
        { category: "Industry Words", words: ["Manufacturing", "Automation", "Export", "Import", "Revenue", "Investment", "Infrastructure", "Productivity", "Labour", "Patent", "Innovation", "Outsourcing", "Workforce", "Supply chain", "Merger"] },
        { category: "Legal Words", words: ["Verdict", "Bail", "Custody", "Witness", "Evidence", "Accused", "Acquittal", "Conviction", "Plaintiff", "Defendant", "Penalty", "Tribunal", "Lawsuit", "Constitution", "Appeal"] },
        { category: "Body & Health", words: ["Fracture", "Infection", "Vaccination", "Surgery", "Diagnosis", "Allergy", "Diabetes", "Asthma", "Fever", "Malaria", "Kidney", "Liver", "Lungs", "Spine", "Stomach"] },
      ],
    },
    speakingRevision: {
      title: "Speaking Tips Compilation",
      tips: [
        "Speak slowly and clearly - don't rush",
        "Use connecting words: Actually, Basically, I mean, You know",
        "Pause before important points for emphasis",
        "Make eye contact while speaking",
        "Use hand gestures naturally",
        "Don't translate from Hindi to English - think in English",
        "Practice tongue twisters for pronunciation",
        "Listen to English movies/news daily",
        "Record yourself speaking and review",
        "Don't be afraid of making mistakes - correction leads to improvement",
        "Use 'I think', 'I believe', 'In my opinion' for opinions",
        "Ask 'Could you repeat that?' if you don't understand",
        "Learn 5 new English words daily and use them in conversation",
        "Speak English with friends even if they know Hindi",
        "Join English speaking clubs or groups",
      ],
      conversationStarters: [
        "Have you heard about...?",
        "What do you think about...?",
        "Did you know that...?",
        "I was wondering if...",
        "That reminds me of...",
        "Speaking of which...",
        "To be honest...",
        "As far as I know...",
        "In my experience...",
        "Let me put it this way...",
      ],
      commonPhrases: [
        "I'd like to add that...",
        "What I mean is...",
        "Let me explain...",
        "For instance...",
        "As a result...",
        "On the other hand...",
        "In conclusion...",
        "It goes without saying that...",
        "Needless to say...",
        "More often than not...",
      ],
    },
    rapidFireQuestions: [
      { id: 1, q: "Simple Present formula?", a: "Subject + V1 + Object" },
      { id: 2, q: "Present Perfect formula?", a: "Subject + has/have + V3 + Object" },
      { id: 3, q: "Passive voice of 'Ram eats mangoes'?", a: "Mangoes are eaten by Ram." },
      { id: 4, q: "Use 'A' or 'An' before: university?", a: "A university (vowel sound not a vowel)" },
      { id: 5, q: "Use 'In', 'On', or 'At' before: Monday?", a: "On Monday" },
      { id: 6, q: "Modal for advice?", a: "Should" },
      { id: 7, q: "Indirect speech of 'He said I am happy'?", a: "He said that he was happy." },
      { id: 8, q: "Antonym of 'Optimism'?", a: "Pessimism" },
      { id: 9, q: "Hindi of 'Integrity'?", a: "ईमानदारी / सत्यनिष्ठा" },
      { id: 10, q: "Plural of 'Leaf'?", a: "Leaves" },
      { id: 11, q: "'Since' vs 'For' - what's the difference?", a: "Since = starting point (since 2020); For = duration (for 3 hours)" },
      { id: 12, q: "Comparative of 'Good'?", a: "Better" },
      { id: 13, q: "Superlative of 'Bad'?", a: "Worst" },
      { id: 14, q: "V3 of 'Write'?", a: "Written" },
      { id: 15, q: "Formula for Past Perfect?", a: "Subject + had + V3 + Object" },
      { id: 16, q: "What is the 'subject' in: 'Rahul plays cricket'?", a: "Rahul" },
      { id: 17, q: "Hindi of 'Verdict'?", a: "फैसला" },
      { id: 18, q: "What is a 'conjunction'?", a: "Word joining clauses: and, but, because, although" },
      { id: 19, q: "What does 'export' mean?", a: "निर्यात - sending goods to other countries" },
      { id: 20, q: "Plural of 'Datum'?", a: "Data" },
      { id: 21, q: "Passive of 'He will build a house'?", a: "A house will be built by him." },
      { id: 22, q: "What is 'Monsoon'?", a: "मानसून - rainy season" },
      { id: 23, q: "V2 of 'Go'?", a: "Went" },
      { id: 24, q: "Antonym of 'Generous'?", a: "Stingy / Selfish" },
      { id: 25, q: "Hindi of 'Resilience'?", a: "सहनशीलता / लचीलापन" },
      { id: 26, q: "What is 'Article'?", a: "A, An, The - determiners used before nouns" },
      { id: 27, q: "Hindi of 'Automation'?", a: "स्वचालन" },
      { id: 28, q: "Formula for Future Perfect?", a: "Subject + will have + V3 + Object" },
      { id: 29, q: "What does 'Bail' mean?", a: "जमानत - release from custody on security" },
      { id: 30, q: "V3 of 'Take'?", a: "Taken" },
      { id: 31, q: "Modal for ability?", a: "Can/Could" },
      { id: 32, q: "'The' is used before?", a: "Specific/already known nouns, superlatives, unique things" },
      { id: 33, q: "What is 'Proton'?", a: "Positively charged particle in nucleus" },
      { id: 34, q: "Hindi of 'Conviction'?", a: "दोषसिद्धि" },
      { id: 35, q: "What is 'Prefix'?", a: "Word added before a root word: un-, dis-, re-" },
      { id: 36, q: "What is 'Suffix'?", a: "Word added after a root word: -ful, -less, -ness" },
      { id: 37, q: "Hindi of 'Entrepreneur'?", a: "उद्यमी" },
      { id: 38, q: "Indirect of 'She said, I will come tomorrow'?", a: "She said that she would come the next day." },
      { id: 39, q: "What is 'Simile'?", a: "Comparison using 'like' or 'as': brave as a lion" },
      { id: 40, q: "What is 'Metaphor'?", a: "Direct comparison without like/as: He is a lion." },
      { id: 41, q: "Hindi of 'Turbulent'?", a: "अस्थिर / उथल-पुथल भरा" },
      { id: 42, q: "What is 'Idiom'?", a: "Phrase whose meaning ≠ literal meaning: 'Kick the bucket' = die" },
      { id: 43, q: "Hindi of 'Paradox'?", a: "विरोधाभास" },
      { id: 44, q: "Present Perfect Continuous formula?", a: "Subject + has/have been + V-ing" },
      { id: 45, q: "What is 'Synonym'?", a: "Word with similar meaning: Happy = Joyful" },
      { id: 46, q: "What is 'Antonym'?", a: "Word with opposite meaning: Happy ≠ Sad" },
      { id: 47, q: "Hindi of 'Vaccination'?", a: "टीकाकरण" },
      { id: 48, q: "What is a 'Pronoun'?", a: "Word replacing a noun: He, She, They, It, We" },
      { id: 49, q: "'Used to' is used for?", a: "Past habits no longer done: I used to play cricket." },
      { id: 50, q: "What does 'Tangy' mean?", a: "चटपटा - tart, piquant taste" },
      { id: 51, q: "Plural of 'Crisis'?", a: "Crises" },
      { id: 52, q: "What is 'Passive Voice' used for?", a: "When action is more important than the doer" },
      { id: 53, q: "Hindi of 'Drought'?", a: "सूखा" },
      { id: 54, q: "What does 'CC' mean in an email?", a: "Carbon Copy - other recipients who should see the mail" },
      { id: 55, q: "What is the rule for 'Could'?", a: "Ability in past, polite requests" },
      { id: 56, q: "Plural of 'Analysis'?", a: "Analyses" },
      { id: 57, q: "Hindi of 'Ecosystem'?", a: "पारिस्थितिकी तंत्र" },
      { id: 58, q: "V3 of 'Know'?", a: "Known" },
      { id: 59, q: "What is 'Gerund'?", a: "Verb + ing used as noun: Swimming is good exercise." },
      { id: 60, q: "Hindi of 'Verdict'?", a: "फैसला / निर्णय" },
      { id: 61, q: "Past tense of 'Teach'?", a: "Taught" },
      { id: 62, q: "What is an 'Adverb'?", a: "Word modifying a verb/adjective/adverb: quickly, very, often" },
      { id: 63, q: "What is 'Conjunction'?", a: "Word joining sentences/clauses: and, but, or, because" },
      { id: 64, q: "Hindi of 'Infrastructure'?", a: "बुनियादी ढाँचा" },
      { id: 65, q: "What is 'Interjection'?", a: "Expression of emotion: Oh!, Wow!, Alas!, Hurray!" },
      { id: 66, q: "Hindi of 'Plaintiff'?", a: "वादी" },
      { id: 67, q: "Antonym of 'Conviction'?", a: "Acquittal" },
      { id: 68, q: "What is 'Alliteration'?", a: "Repetition of initial consonant sound: Peter Piper picked peppers" },
      { id: 69, q: "Hindi of 'Revenue'?", a: "राजस्व / आमदनी" },
      { id: 70, q: "What is 'Onomatopoeia'?", a: "Words imitating sounds: buzz, crack, hiss, splash" },
      { id: 71, q: "V3 of 'Rise'?", a: "Risen" },
      { id: 72, q: "What is 'Clause'?", a: "Group of words with subject + verb" },
      { id: 73, q: "Hindi of 'Pandemic'?", a: "महामारी" },
      { id: 74, q: "What is 'Semicolon'?", a: "; - connects two related independent clauses" },
      { id: 75, q: "What is 'Colon'?", a: ": - introduces a list or explanation" },
      { id: 76, q: "Hindi of 'Diligence'?", a: "परिश्रम / लगन" },
      { id: 77, q: "Past tense of 'Bring'?", a: "Brought" },
      { id: 78, q: "What is 'Irony'?", a: "Saying opposite of what you mean: 'Great job!' (after a mistake)" },
      { id: 79, q: "Hindi of 'Monsoon'?", a: "मानसून" },
      { id: 80, q: "V3 of 'Break'?", a: "Broken" },
      { id: 81, q: "What is 'Hyperbole'?", a: "Exaggeration for effect: I've told you a million times!" },
      { id: 82, q: "Hindi of 'Harmony'?", a: "सामंजस्य" },
      { id: 83, q: "Degrees of comparison: 'Beautiful'?", a: "Beautiful, More beautiful, Most beautiful" },
      { id: 84, q: "What is 'Apostrophe' used for?", a: "Possession (Ram's book) and contractions (don't)" },
      { id: 85, q: "Hindi of 'Epidemic'?", a: "महामारी (local) / बीमारी का फैलाव" },
      { id: 86, q: "What does 'ASAP' stand for?", a: "As Soon As Possible" },
      { id: 87, q: "What is 'Abstract noun'?", a: "Noun that cannot be seen/touched: love, joy, peace, wisdom" },
      { id: 88, q: "Hindi of 'Astrologer'?", a: "ज्योतिषी" },
      { id: 89, q: "V3 of 'Choose'?", a: "Chosen" },
      { id: 90, q: "What is 'Collective noun'?", a: "Noun for a group: flock of birds, team of players, herd of cattle" },
      { id: 91, q: "Hindi of 'Serenity'?", a: "शांति" },
      { id: 92, q: "Past tense of 'Think'?", a: "Thought" },
      { id: 93, q: "What is 'Countable noun'?", a: "Noun that can be counted: book, pen, apple" },
      { id: 94, q: "What is 'Uncountable noun'?", a: "Noun that cannot be counted: water, milk, rice, advice" },
      { id: 95, q: "Hindi of 'Fortitude'?", a: "साहस / धैर्य" },
      { id: 96, q: "Difference between 'Its' and 'It's'?", a: "Its = possessive (its tail); It's = it is/it has" },
      { id: 97, q: "Hindi of 'Philanthropy'?", a: "परोपकार / दान-धर्म" },
      { id: 98, q: "V3 of 'Speak'?", a: "Spoken" },
      { id: 99, q: "What is 'Oxymoron'?", a: "Two contradictory words together: deafening silence, bitter sweet" },
      { id: 100, q: "What is the final day of 75 Days Hard English?", a: "Day 75: Complete Mock Test + Final Revision" },
    ],
  },

  // ============================================================
  // DAY 75: COMPLETE MOCK TEST + FINAL REVISION
  // ============================================================
  day75: {
    day: 75,
    title: "Complete Mock Test + Final Revision",
    category: "test",
    difficulty: "hard",
    duration: 180,
    description: "Comprehensive 200-question mock test covering all 75 days, with final revision notes and certificate criteria.",
    mockTest: [
      // GRAMMAR SECTION (Questions 1-60)
      { id: 1, section: "Grammar", question: "Which sentence is correct?", options: ["She go to school daily.", "She goes to school daily.", "She going to school daily.", "She gone to school daily."], answer: "She goes to school daily.", explanation: "Simple Present: She + goes (V1 + s for third person singular)" },
      { id: 2, section: "Grammar", question: "Fill in the blank: She _____ a letter now.", options: ["write", "writes", "is writing", "has written"], answer: "is writing", explanation: "Present Continuous: 'now' indicates ongoing action" },
      { id: 3, section: "Grammar", question: "Passive voice of 'He wrote a letter':", options: ["A letter was written by him.", "A letter is written by him.", "A letter wrote by him.", "A letter written by him."], answer: "A letter was written by him.", explanation: "Simple Past passive: Object + was + V3 + by + Subject" },
      { id: 4, section: "Grammar", question: "Indirect speech of 'He said, I am happy':", options: ["He said that he is happy.", "He said that he was happy.", "He told that he was happy.", "He said he is happy."], answer: "He said that he was happy.", explanation: "Present 'am' changes to 'was' in indirect speech" },
      { id: 5, section: "Grammar", question: "Choose correct article: She is _____ honest girl.", options: ["a", "an", "the", "no article"], answer: "an", explanation: "'Honest' starts with vowel sound /ɒ/, so 'an' is used" },
      { id: 6, section: "Grammar", question: "Which is a modal verb of advice?", options: ["Must", "Can", "Should", "Would"], answer: "Should", explanation: "'Should' is used for advice and suggestions" },
      { id: 7, section: "Grammar", question: "Find the error: He don't like coffee.", options: ["He", "don't", "like", "coffee"], answer: "don't", explanation: "Third person singular: 'doesn't' not 'don't'" },
      { id: 8, section: "Grammar", question: "Past tense of 'Go':", options: ["Goed", "Goes", "Went", "Gone"], answer: "Went", explanation: "'Go' is irregular verb; past form is 'went'" },
      { id: 9, section: "Grammar", question: "'I have been studying for 3 hours.' This is:", options: ["Simple Present", "Present Perfect", "Present Perfect Continuous", "Present Continuous"], answer: "Present Perfect Continuous", explanation: "has/have been + V-ing = Present Perfect Continuous, shows ongoing action from past" },
      { id: 10, section: "Grammar", question: "Choose the correct preposition: She arrived _____ Monday.", options: ["in", "at", "on", "by"], answer: "on", explanation: "'On' is used with days of the week" },
      { id: 11, section: "Grammar", question: "Superlative degree of 'Good':", options: ["Gooder", "Goodest", "Better", "Best"], answer: "Best", explanation: "Good → Better → Best (irregular comparison)" },
      { id: 12, section: "Grammar", question: "'He has finished his work.' This is:", options: ["Simple Past", "Present Perfect", "Past Perfect", "Present Continuous"], answer: "Present Perfect", explanation: "has/have + V3 = Present Perfect" },
      { id: 13, section: "Grammar", question: "Choose the correct form: He suggested that I _____ a doctor.", options: ["see", "sees", "saw", "had seen"], answer: "see", explanation: "After 'suggest', use bare infinitive or 'should + V1'" },
      { id: 14, section: "Grammar", question: "What type of noun is 'flock' in 'a flock of birds'?", options: ["Abstract noun", "Proper noun", "Collective noun", "Material noun"], answer: "Collective noun", explanation: "Collective nouns name a group: flock, team, herd, jury" },
      { id: 15, section: "Grammar", question: "Find the adjective: The tall boy ran fast.", options: ["boy", "tall", "ran", "fast"], answer: "tall", explanation: "'Tall' describes the noun 'boy', so it's an adjective" },
      { id: 16, section: "Grammar", question: "Correct form: Neither of the boys _____ absent.", options: ["are", "were", "was", "is"], answer: "is", explanation: "'Neither' takes singular verb" },
      { id: 17, section: "Grammar", question: "Which sentence uses 'since' correctly?", options: ["I have studied since 3 hours.", "I have studied since 2020.", "I study since morning.", "I studied since yesterday."], answer: "I have studied since 2020.", explanation: "'Since' is used with a starting point and present perfect" },
      { id: 18, section: "Grammar", question: "'Cats are domestic animals.' The article used here:", options: ["'The' is implied", "No article needed", "A is needed", "An is needed"], answer: "No article needed", explanation: "General plural nouns don't need articles" },
      { id: 19, section: "Grammar", question: "Identify the adverb: She sings beautifully.", options: ["She", "sings", "beautifully", "All of these"], answer: "beautifully", explanation: "'Beautifully' modifies the verb 'sings' - it's an adverb" },
      { id: 20, section: "Grammar", question: "Which is the correct conditional sentence?", options: ["If it rains, I will stay home.", "If it rains, I stay home.", "If it will rain, I will stay home.", "If it rained, I will stay home."], answer: "If it rains, I will stay home.", explanation: "Type 1 conditional: If + Present Simple, will + V1" },
      { id: 21, section: "Grammar", question: "The V3 (past participle) of 'break' is:", options: ["Broke", "Broked", "Broken", "Breaking"], answer: "Broken", explanation: "Break → Broke → Broken (irregular verb)" },
      { id: 22, section: "Grammar", question: "Choose correct: I am used to _____ early.", options: ["wake", "woke", "waking", "woken"], answer: "waking", explanation: "'Be used to' is followed by gerund (V-ing)" },
      { id: 23, section: "Grammar", question: "What is a 'gerund'?", options: ["Verb in past form", "Verb + ing used as noun", "Adjective form", "Auxiliary verb"], answer: "Verb + ing used as noun", explanation: "Gerund: Swimming is healthy. (Swimming = subject/noun)" },
      { id: 24, section: "Grammar", question: "'The Ganga is a holy river.' 'The' is used because:", options: ["Ganga starts with G", "Ganga is a specific river", "Rivers always use 'the'", "It is a holy river"], answer: "Ganga is a specific river", explanation: "'The' is used before specific, unique names of rivers, mountains, etc." },
      { id: 25, section: "Grammar", question: "Identify the conjunction: I was tired but I continued working.", options: ["was", "but", "continued", "working"], answer: "but", explanation: "'But' is a coordinating conjunction showing contrast" },
      { id: 26, section: "Grammar", question: "Correct the error: She didn't went to school.", options: ["didn't", "went", "to", "school"], answer: "went", explanation: "After 'didn't', use V1: didn't go (not went)" },
      { id: 27, section: "Grammar", question: "'Could you please help me?' This modal expresses:", options: ["Ability", "Permission", "Polite request", "Obligation"], answer: "Polite request", explanation: "'Could' is used for making polite requests" },
      { id: 28, section: "Grammar", question: "Plural of 'Crisis':", options: ["Crisises", "Crises", "Crisis", "Crisiss"], answer: "Crises", explanation: "Words ending in '-is' form plural by changing to '-es'" },
      { id: 29, section: "Grammar", question: "Identify the preposition: The book is on the table.", options: ["book", "is", "on", "table"], answer: "on", explanation: "'On' shows the relationship/position of book to table" },
      { id: 30, section: "Grammar", question: "What type of sentence is 'What a beautiful painting!'?", options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"], answer: "Exclamatory", explanation: "Exclamatory sentences express strong emotion and end with '!'" },
      // VOCABULARY SECTION (Questions 31-100)
      { id: 31, section: "Vocabulary", question: "What does 'Eloquence' mean?", options: ["सुस्ती", "वाक्पटुता", "विनम्रता", "साहस"], answer: "वाक्पटुता", explanation: "Eloquence = the ability to speak or write fluently and persuasively" },
      { id: 32, section: "Vocabulary", question: "'Diligent' means:", options: ["Lazy", "Hardworking", "Cruel", "Timid"], answer: "Hardworking", explanation: "Diligent = hardworking, showing care and effort" },
      { id: 33, section: "Vocabulary", question: "Antonym of 'Optimism':", options: ["Hopefulness", "Positivity", "Pessimism", "Zeal"], answer: "Pessimism", explanation: "Optimism (आशावाद) ↔ Pessimism (निराशावाद)" },
      { id: 34, section: "Vocabulary", question: "Which word means 'उद्यमी'?", options: ["Employee", "Entrepreneur", "Engineer", "Expert"], answer: "Entrepreneur", explanation: "Entrepreneur = उद्यमी - person who starts and runs a business" },
      { id: 35, section: "Vocabulary", question: "'Marinate' means:", options: ["To bake", "To cut", "To soak in spices/sauce", "To garnish"], answer: "To soak in spices/sauce", explanation: "Marinate = to soak food in a mixture of spices before cooking" },
      { id: 36, section: "Vocabulary", question: "Hindi of 'Verdict':", options: ["जमानत", "आरोप", "फैसला", "गवाह"], answer: "फैसला", explanation: "Verdict = the decision of a court" },
      { id: 37, section: "Vocabulary", question: "Which insect makes honey?", options: ["Ant", "Mosquito", "Bee", "Fly"], answer: "Bee", explanation: "Bees (मधुमक्खियाँ) collect nectar and make honey" },
      { id: 38, section: "Vocabulary", question: "India's national flower is:", options: ["Rose", "Marigold", "Sunflower", "Lotus"], answer: "Lotus", explanation: "Lotus (कमल) is India's national flower" },
      { id: 39, section: "Vocabulary", question: "'Turbulent' means:", options: ["Peaceful", "Unsteady/Chaotic", "Bright", "Soft"], answer: "Unsteady/Chaotic", explanation: "Turbulent = अस्थिर - full of confusion, disorder" },
      { id: 40, section: "Vocabulary", question: "What is 'Malaria' spread by?", options: ["Flies", "Ants", "Mosquitoes", "Cockroaches"], answer: "Mosquitoes", explanation: "Malaria is caused by the Plasmodium parasite spread by Anopheles mosquitoes" },
      { id: 41, section: "Vocabulary", question: "'Automation' means:", options: ["Manual work", "Self-operating process/mechanization", "Labour", "Handcraft"], answer: "Self-operating process/mechanization", explanation: "Automation = स्वचालन - using technology to perform tasks automatically" },
      { id: 42, section: "Vocabulary", question: "Azure is a shade of:", options: ["Red", "Green", "Yellow", "Blue"], answer: "Blue", explanation: "Azure = आसमानी नीला - bright sky blue colour" },
      { id: 43, section: "Vocabulary", question: "India's national bird is:", options: ["Eagle", "Sparrow", "Peacock", "Crow"], answer: "Peacock", explanation: "Peacock (मोर) is India's national bird" },
      { id: 44, section: "Vocabulary", question: "What does 'Acquittal' mean?", options: ["Conviction", "Being found not guilty", "Fine", "Arrest"], answer: "Being found not guilty", explanation: "Acquittal = दोषमुक्ति - being declared not guilty in court" },
      { id: 45, section: "Vocabulary", question: "'Biodegradable' means:", options: ["Cannot be broken down", "Can be broken down by nature", "Toxic", "Synthetic"], answer: "Can be broken down by nature", explanation: "Biodegradable = जैव-अपघटनीय - can be decomposed naturally" },
      { id: 46, section: "Vocabulary", question: "Which word means 'प्रायिकता'?", options: ["Ratio", "Probability", "Average", "Statistics"], answer: "Probability", explanation: "Probability = प्रायिकता - likelihood of an event occurring" },
      { id: 47, section: "Vocabulary", question: "Hindi of 'Resilience':", options: ["सुस्ती", "सहनशीलता", "उदारता", "साहस"], answer: "सहनशीलता", explanation: "Resilience = ability to recover from difficulties" },
      { id: 48, section: "Vocabulary", question: "What is a 'Constellation'?", options: ["A planet", "A group of stars", "A comet", "An eclipse"], answer: "A group of stars", explanation: "Constellation = तारामंडल - pattern of stars named after animals or mythological figures" },
      { id: 49, section: "Vocabulary", question: "'Euphoria' means:", options: ["Sadness", "Intense happiness", "Confusion", "Fear"], answer: "Intense happiness", explanation: "Euphoria = परमानंद - intense feeling of happiness and excitement" },
      { id: 50, section: "Vocabulary", question: "Lotus is India's national flower. 'Lotus' in Hindi:", options: ["गुलाब", "कमल", "चमेली", "सूरजमुखी"], answer: "कमल", explanation: "Lotus = कमल" },
      { id: 51, section: "Vocabulary", question: "'Meticulous' describes someone who is:", options: ["Careless", "Reckless", "Extremely careful and precise", "Lazy"], answer: "Extremely careful and precise", explanation: "Meticulous = सूक्ष्मदर्शी - showing great attention to detail" },
      { id: 52, section: "Vocabulary", question: "'Monsoon' in Hindi:", options: ["बाढ़", "सूखा", "मानसून", "चक्रवात"], answer: "मानसून", explanation: "Monsoon = मानसून - the seasonal rainy period" },
      { id: 53, section: "Vocabulary", question: "What is 'Termite'?", options: ["मच्छर", "दीमक", "जूँ", "तिलचट्टा"], answer: "दीमक", explanation: "Termite = दीमक - wood-eating insect" },
      { id: 54, section: "Vocabulary", question: "'Tantalize' means:", options: ["To satisfy completely", "To tease by offering something desirable but unattainable", "To ignore", "To praise"], answer: "To tease by offering something desirable but unattainable", explanation: "Tantalize = to torment with the sight of something desired but unreachable" },
      { id: 55, section: "Vocabulary", question: "Hindi of 'Patent':", options: ["लाभ", "पेटेंट (बौद्धिक संपदा अधिकार)", "निवेश", "आयात"], answer: "पेटेंट (बौद्धिक संपदा अधिकार)", explanation: "Patent = exclusive right to an invention" },
      { id: 56, section: "Vocabulary", question: "Which colour is 'Maroon'?", options: ["Sky blue", "Deep red", "Light green", "Golden yellow"], answer: "Deep red", explanation: "Maroon = गहरा भूरा-लाल (dark brownish-red colour)" },
      { id: 57, section: "Vocabulary", question: "What does 'Candour' mean?", options: ["Dishonesty", "Frankness/Honesty", "Cruelty", "Confusion"], answer: "Frankness/Honesty", explanation: "Candour = स्पष्टवादिता - being frank and open" },
      { id: 58, section: "Vocabulary", question: "'Aroma' refers to:", options: ["Noise", "Taste", "Pleasant smell", "Visual beauty"], answer: "Pleasant smell", explanation: "Aroma = सुगंध - a pleasant distinctive smell" },
      { id: 59, section: "Vocabulary", question: "What is 'Horoscope' in Hindi?", options: ["राशिचक्र", "कुंडली", "ग्रह", "नक्षत्र"], answer: "कुंडली", explanation: "Horoscope = जन्मपत्री / कुंडली - astrological birth chart" },
      { id: 60, section: "Vocabulary", question: "'Valiant' means:", options: ["Cowardly", "Brave/Courageous", "Lazy", "Selfish"], answer: "Brave/Courageous", explanation: "Valiant = वीर - showing courage, especially in battle" },
      { id: 61, section: "Vocabulary", question: "'Earthworm' is important for:", options: ["Making honey", "Spreading diseases", "Making soil fertile", "Building webs"], answer: "Making soil fertile", explanation: "Earthworms = केंचुए - improve soil by breaking down organic matter" },
      { id: 62, section: "Vocabulary", question: "'Serenity' means:", options: ["Chaos", "Calmness/Peace", "Excitement", "Anger"], answer: "Calmness/Peace", explanation: "Serenity = शांति - state of calmness" },
      { id: 63, section: "Vocabulary", question: "What is 'Drought'?", options: ["बाढ़", "तूफान", "सूखा", "ओला"], answer: "सूखा", explanation: "Drought = सूखा - prolonged period of abnormally low rainfall" },
      { id: 64, section: "Vocabulary", question: "'Perpendicular' lines meet at:", options: ["0°", "45°", "90°", "180°"], answer: "90°", explanation: "Perpendicular lines = लंब रेखाएँ - meet at right angle (90°)" },
      { id: 65, section: "Vocabulary", question: "Hindi of 'Astronomy':", options: ["ज्योतिष", "खगोल विज्ञान", "भूगोल", "भौतिकी"], answer: "खगोल विज्ञान", explanation: "Astronomy = खगोल विज्ञान - scientific study of celestial objects" },
      { id: 66, section: "Vocabulary", question: "'Frugality' relates to:", options: ["Spending wastefully", "Being thrifty and economical", "Being generous", "Being lazy"], answer: "Being thrifty and economical", explanation: "Frugality = मितव्ययिता - quality of being careful with money/resources" },
      { id: 67, section: "Vocabulary", question: "What does 'Diagnosis' mean?", options: ["टीकाकरण", "रोग निदान", "ऑपरेशन", "दवाई"], answer: "रोग निदान", explanation: "Diagnosis = identifying a disease through examination" },
      { id: 68, section: "Vocabulary", question: "'Jubilation' is closest in meaning to:", options: ["Sadness", "Anger", "Joy/Celebration", "Fear"], answer: "Joy/Celebration", explanation: "Jubilation = उल्लास - great joy and triumph" },
      { id: 69, section: "Vocabulary", question: "Hindi of 'Infrastructure':", options: ["विनिर्माण", "बुनियादी ढाँचा", "राजस्व", "श्रम"], answer: "बुनियादी ढाँचा", explanation: "Infrastructure = basic facilities and systems needed for operation" },
      { id: 70, section: "Vocabulary", question: "'Nocturnal' animals are active:", options: ["During day", "In winter", "At night", "In water"], answer: "At night", explanation: "Nocturnal = रात्रिचर - active at night (owls, bats, etc.)" },
      // WRITING SKILLS (Questions 71-110)
      { id: 71, section: "Writing", question: "In a formal letter, 'Yours faithfully' is used when:", options: ["Writing to a friend", "Writing to a known person", "Writing to an unknown person", "Writing to parents"], answer: "Writing to an unknown person", explanation: "'Yours faithfully' for unknown recipients; 'Yours sincerely' for known" },
      { id: 72, section: "Writing", question: "The first sentence of a paragraph that states the main idea is called:", options: ["Concluding sentence", "Supporting sentence", "Topic sentence", "Transition sentence"], answer: "Topic sentence", explanation: "Topic sentence = states the main idea of the paragraph" },
      { id: 73, section: "Writing", question: "In an email, 'BCC' stands for:", options: ["Best Carbon Copy", "Blind Carbon Copy", "Basic Copy", "Before Carbon Copy"], answer: "Blind Carbon Copy", explanation: "BCC = Blind Carbon Copy - recipient can't see who else received the email" },
      { id: 74, section: "Writing", question: "A notice should be written in:", options: ["First person", "Second person", "Third person", "Any person"], answer: "Third person", explanation: "Notices are written in third person: 'Students are informed that...'" },
      { id: 75, section: "Writing", question: "Which format is NOT part of a formal application?", options: ["Sender's address", "Subject line", "Postscript (P.S.)", "Salutation"], answer: "Postscript (P.S.)", explanation: "P.S. is used in informal letters, not formal applications" },
      { id: 76, section: "Writing", question: "A paragraph should ideally focus on:", options: ["Multiple ideas", "Two main ideas", "One main idea", "As many ideas as possible"], answer: "One main idea", explanation: "One paragraph = one main idea, developed through supporting sentences" },
      { id: 77, section: "Writing", question: "In a job application email, what should the subject line contain?", options: ["Just 'Hello'", "The job title and reference number", "Your personal information", "Company name only"], answer: "The job title and reference number", explanation: "Subject line should clearly identify the purpose: 'Application for Marketing Manager - Ref: TM2025'" },
      { id: 78, section: "Writing", question: "Which transition word shows contrast?", options: ["Moreover", "Furthermore", "However", "Therefore"], answer: "However", explanation: "However = but, used to introduce contrasting information" },
      { id: 79, section: "Writing", question: "The word limit for a school notice is approximately:", options: ["200-250 words", "50-80 words", "300-350 words", "100-150 words"], answer: "50-80 words", explanation: "Notices are brief and concise, typically 50-80 words" },
      { id: 80, section: "Writing", question: "Which is NOT a part of an email format?", options: ["To:", "Subject:", "Sender's postal address", "Body"], answer: "Sender's postal address", explanation: "Emails don't need postal addresses; they use email addresses" },
      // COMPREHENSION & APPLIED ENGLISH (Questions 81-140)
      { id: 81, section: "Comprehension", question: "Choose the correctly spelled word:", options: ["Recieve", "Receive", "Recive", "Receieve"], answer: "Receive", explanation: "I before E except after C: recEIve" },
      { id: 82, section: "Comprehension", question: "Choose the correctly spelled word:", options: ["Occurance", "Occurance", "Occurrence", "Occurence"], answer: "Occurrence", explanation: "Occurrence - double c, double r" },
      { id: 83, section: "Comprehension", question: "'The ball was kicked by Ravi.' Who kicked the ball?", options: ["Ball", "By", "Ravi", "No one"], answer: "Ravi", explanation: "In passive voice, the doer comes after 'by'" },
      { id: 84, section: "Comprehension", question: "Which sentence has correct subject-verb agreement?", options: ["The boys plays cricket.", "The boys play cricket.", "The boys played cricket every days.", "The boys are plays cricket."], answer: "The boys play cricket.", explanation: "Plural subject (boys) takes plural verb (play)" },
      { id: 85, section: "Comprehension", question: "Identify the figure of speech in: 'The wind whispered through the trees.'", options: ["Simile", "Metaphor", "Personification", "Alliteration"], answer: "Personification", explanation: "Personification = giving human qualities to non-human things (wind 'whispered')" },
      { id: 86, section: "Comprehension", question: "'As brave as a lion' is an example of:", options: ["Metaphor", "Personification", "Simile", "Hyperbole"], answer: "Simile", explanation: "Simile = comparison using 'like' or 'as'" },
      { id: 87, section: "Comprehension", question: "Which is the correct question tag? 'She is smart, _____?'", options: ["isn't it", "is she", "isn't she", "doesn't she"], answer: "isn't she", explanation: "Positive statement → Negative question tag; 'is' → 'isn't'" },
      { id: 88, section: "Comprehension", question: "What does the idiom 'Break the ice' mean?", options: ["To break glass", "To make people feel comfortable in a new situation", "To start a fight", "To destroy something"], answer: "To make people feel comfortable in a new situation", explanation: "Break the ice = to initiate conversation and ease tension in a social situation" },
      { id: 89, section: "Comprehension", question: "'Every cloud has a silver lining' means:", options: ["Clouds are silver-coloured", "Every bad situation has a positive aspect", "Rain brings prosperity", "Clouds have edges"], answer: "Every bad situation has a positive aspect", explanation: "This idiom means there is always hope in a difficult situation" },
      { id: 90, section: "Comprehension", question: "Choose correct: I _____ my homework before dinner.", options: ["finish", "finished", "have finished", "am finishing"], answer: "have finished", explanation: "Present perfect used for actions completed with present relevance" },
      { id: 91, section: "Comprehension", question: "Identify the pronoun: Raman gave him the book.", options: ["Raman", "gave", "him", "book"], answer: "him", explanation: "'Him' is an objective pronoun replacing a male person" },
      { id: 92, section: "Comprehension", question: "Which is an abstract noun?", options: ["Chair", "River", "Courage", "Mango"], answer: "Courage", explanation: "Abstract noun = cannot be seen/touched: courage, love, freedom, honesty" },
      { id: 93, section: "Comprehension", question: "'Rome was not built in a day' means:", options: ["Rome is a small city", "Great achievements take time", "Building is easy", "Romans were lazy"], answer: "Great achievements take time", explanation: "This proverb means important work cannot be done quickly" },
      { id: 94, section: "Comprehension", question: "Identify the conjunction in: I was tired but I continued.", options: ["I", "was", "but", "continued"], answer: "but", explanation: "'But' is a coordinating conjunction showing contrast" },
      { id: 95, section: "Comprehension", question: "Which sentence is in passive voice?", options: ["She writes a letter.", "He is writing a letter.", "The letter was written by her.", "She had written a letter."], answer: "The letter was written by her.", explanation: "Passive voice: object + be + V3 + by + subject" },
      { id: 96, section: "Comprehension", question: "'Actions speak louder than words' means:", options: ["Words are more important", "What you do matters more than what you say", "Loud people are successful", "Actions make noise"], answer: "What you do matters more than what you say", explanation: "This proverb means behaviour is more important than words" },
      { id: 97, section: "Comprehension", question: "Find the error: He is more taller than his brother.", options: ["He is", "more taller", "than his", "brother"], answer: "more taller", explanation: "'Taller' is already comparative; don't add 'more'" },
      { id: 98, section: "Comprehension", question: "What is the plural of 'Child'?", options: ["Childs", "Childen", "Children", "Childes"], answer: "Children", explanation: "Child → Children (irregular plural)" },
      { id: 99, section: "Comprehension", question: "'It was raining when I arrived.' What tense is 'was raining'?", options: ["Simple Past", "Past Continuous", "Past Perfect", "Present Continuous"], answer: "Past Continuous", explanation: "was/were + V-ing = Past Continuous" },
      { id: 100, section: "Comprehension", question: "Choose correct: She told me that she _____ reading.", options: ["is", "was", "were", "has been"], answer: "was", explanation: "Indirect speech: present 'is' changes to past 'was'" },
      // HINDI TO ENGLISH TRANSLATION (Questions 101-140)
      { id: 101, section: "Translation", question: "'वह रोज स्कूल जाती है' - which is the best translation?", options: ["She going to school daily.", "She goes to school daily.", "She go school every day.", "She is goes to school."], answer: "She goes to school daily.", explanation: "Simple present habit: Subject + V1(+s/es) + Object" },
      { id: 102, section: "Translation", question: "'मुझे एक किताब चाहिए' translates to:", options: ["I want a book.", "I need a book.", "Both A and B are correct", "I am wanting a book."], answer: "Both A and B are correct", explanation: "Both 'want' and 'need' can translate 'चाहिए' depending on context" },
      { id: 103, section: "Translation", question: "'वह 2 घंटे से पढ़ रही है' translates to:", options: ["She is reading for 2 hours.", "She has been reading for 2 hours.", "She read for 2 hours.", "She was reading for 2 hours."], answer: "She has been reading for 2 hours.", explanation: "Ongoing action from past: Present Perfect Continuous" },
      { id: 104, section: "Translation", question: "'क्या मैं अंदर आ सकता हूँ?' translates to:", options: ["Can I come inside?", "May I come in?", "Should I come inside?", "Must I enter?"], answer: "May I come in?", explanation: "'May I' is the polite form for asking permission" },
      { id: 105, section: "Translation", question: "'उसने मुझे बताया कि वह थका हुआ है' translates to:", options: ["He told me that he is tired.", "He told me that he was tired.", "He said to me he is tired.", "He speaks that he was tired."], answer: "He told me that he was tired.", explanation: "Indirect speech with reported verb 'told'" },
      { id: 106, section: "Translation", question: "'अगर बारिश होती, तो मैं घर पर रहता' - This is:", options: ["Type 1 conditional", "Type 2 conditional", "Type 3 conditional", "Zero conditional"], answer: "Type 2 conditional", explanation: "Type 2: If + Past Simple, would + V1 (unreal/unlikely)" },
      { id: 107, section: "Translation", question: "'तुम्हें कड़ी मेहनत करनी चाहिए' translates to:", options: ["You must work hard.", "You should work hard.", "You would work hard.", "You may work hard."], answer: "You should work hard.", explanation: "'Should' = advice and suggestion" },
      { id: 108, section: "Translation", question: "'पुस्तक मेज पर रखी गई' - choose correct passive translation:", options: ["The book was kept on the table.", "The book is kept on the table.", "Someone kept the book on table.", "Book has been kept on table."], answer: "The book was kept on the table.", explanation: "Passive voice in simple past" },
      { id: 109, section: "Translation", question: "'वह खाना खा रहा था जब मैं आया' translates to:", options: ["He ate food when I came.", "He was eating food when I came.", "He is eating food when I came.", "He had eaten food when I came."], answer: "He was eating food when I came.", explanation: "Simultaneous action: Past Continuous + Simple Past" },
      { id: 110, section: "Translation", question: "'कभी झूठ मत बोलो' translates to:", options: ["You should not lie.", "Never tell a lie.", "Don't lying never.", "Never to lie."], answer: "Never tell a lie.", explanation: "Negative imperative: Never + V1 + Object" },
      // READING COMPREHENSION (Questions 111-130)
      { id: 111, section: "Reading", question: "Read: 'Mahatma Gandhi was born on October 2, 1869.' When was Gandhi born?", options: ["October 2, 1879", "October 2, 1869", "October 12, 1869", "October 2, 1896"], answer: "October 2, 1869", explanation: "Direct answer from the text" },
      { id: 112, section: "Reading", question: "'He was known for his non-violent resistance.' What does 'non-violent' mean?", options: ["Very violent", "Without violence", "Against all resistance", "Using weapons"], answer: "Without violence", explanation: "Non = not; non-violent = without violence" },
      { id: 113, section: "Reading", question: "'Punctuality is the politeness of kings.' What does this mean?", options: ["Kings are always late", "Being on time is a sign of respect and courtesy", "Only kings are punctual", "Politeness makes kings"], answer: "Being on time is a sign of respect and courtesy", explanation: "This proverb means that punctuality is a virtue" },
      { id: 114, section: "Reading", question: "'The early bird catches the worm.' What does 'early bird' refer to?", options: ["A type of bird", "Someone who wakes up/arrives early", "A bird that likes worms", "Morning routine"], answer: "Someone who wakes up/arrives early", explanation: "Idiom: 'early bird' = person who rises or acts early" },
      { id: 115, section: "Reading", question: "'She was over the moon when she received the offer.' What is the figurative meaning?", options: ["She was above the moon", "She was extremely happy", "She received a lunar offer", "She was surprised"], answer: "She was extremely happy", explanation: "Idiom 'over the moon' = extremely happy" },
      { id: 116, section: "Reading", question: "Find the main idea of: 'Exercise improves mood, increases energy, and promotes better sleep. It also reduces the risk of heart disease and diabetes.'", options: ["Exercise causes heart disease", "Sleep is important for health", "Exercise has many health benefits", "Mood affects exercise"], answer: "Exercise has many health benefits", explanation: "All sentences support the idea that exercise is beneficial" },
      { id: 117, section: "Reading", question: "What does 'compound interest' mean?", options: ["Simple interest on a compound", "Interest calculated on both principal and accumulated interest", "Interest on loans only", "Fixed interest rate"], answer: "Interest calculated on both principal and accumulated interest", explanation: "Compound interest grows faster as it's calculated on the total amount" },
      { id: 118, section: "Reading", question: "Which is an example of alliteration?", options: ["She is as brave as a lion.", "Peter Piper picked a peck of pickled peppers.", "The wind whispered through the trees.", "He ate a million hot dogs."], answer: "Peter Piper picked a peck of pickled peppers.", explanation: "Alliteration = repetition of same initial consonant sound" },
      { id: 119, section: "Reading", question: "'It was an open secret.' This is an example of:", options: ["Simile", "Metaphor", "Oxymoron", "Alliteration"], answer: "Oxymoron", explanation: "Oxymoron = two contradictory words: 'open' + 'secret'" },
      { id: 120, section: "Reading", question: "'He said that he had finished his work.' The original direct speech was:", options: ["He said, 'I have finished my work.'", "He said, 'I had finished my work.'", "He says, 'I finished my work.'", "He said, 'I finish my work.'"], answer: "He said, 'I have finished my work.'", explanation: "In indirect, past perfect ('had finished') = present perfect in direct ('have finished')" },
      // SPOKEN ENGLISH (Questions 121-150)
      { id: 121, section: "Spoken", question: "Which is the most polite way to ask for a favour?", options: ["Give me that.", "You must give me that.", "Could you please give me that?", "Give that now."], answer: "Could you please give me that?", explanation: "'Could you please' is the most polite request form" },
      { id: 122, section: "Spoken", question: "How do you formally greet someone you're meeting for the first time?", options: ["Hi there!", "Hello! I'm Rahul. Nice to meet you.", "Hey! What's up?", "Yo! How are you doing?"], answer: "Hello! I'm Rahul. Nice to meet you.", explanation: "Formal introduction: use complete sentences and 'Nice to meet you'" },
      { id: 123, section: "Spoken", question: "If you didn't hear what someone said, what do you say?", options: ["What?", "Huh?", "Could you please repeat that?", "Speak louder!"], answer: "Could you please repeat that?", explanation: "Polite way to ask for repetition in professional/formal settings" },
      { id: 124, section: "Spoken", question: "To agree with someone's opinion, you can say:", options: ["You are wrong.", "I think so too / I agree with you.", "Maybe not.", "That's strange."], answer: "I think so too / I agree with you.", explanation: "Positive agreement expressions in English conversation" },
      { id: 125, section: "Spoken", question: "To politely disagree, which is most appropriate?", options: ["You're completely wrong!", "That's stupid!", "I see your point, but I think...", "No way!"], answer: "I see your point, but I think...", explanation: "Respectful disagreement: acknowledge their view, then present yours" },
      { id: 126, section: "Spoken", question: "In a job interview, when asked 'Tell me about yourself', you should:", options: ["Tell your whole life story", "Give a brief professional summary with key skills and goals", "Say 'I don't know'", "Talk only about hobbies"], answer: "Give a brief professional summary with key skills and goals", explanation: "Professional self-introduction should be relevant and concise (2-3 min)" },
      { id: 127, section: "Spoken", question: "Which expression is used to conclude your point in a presentation?", options: ["Blah blah blah", "So that's all I think", "To summarize/In conclusion...", "I'm done now"], answer: "To summarize/In conclusion...", explanation: "Professional discourse markers for concluding" },
      { id: 128, section: "Spoken", question: "What does 'breaking the ice' mean in a social context?", options: ["Literally breaking ice", "Starting a conversation to ease tension", "Fighting with someone", "Being very cold"], answer: "Starting a conversation to ease tension", explanation: "Idiom: making people feel comfortable in a new social situation" },
      { id: 129, section: "Spoken", question: "How do you politely end a phone call?", options: ["Just hang up", "Goodbye, talk to you later. Take care!", "You can go now", "Bye whatever"], answer: "Goodbye, talk to you later. Take care!", explanation: "Polite phone ending: express finality and good wishes" },
      { id: 130, section: "Spoken", question: "In an email, when you say 'FYI', it means:", options: ["Find your information", "For Your Information", "From your inbox", "Fix Your Issue"], answer: "For Your Information", explanation: "FYI = For Your Information - common email abbreviation" },
      // ADVANCED QUESTIONS (131-170)
      { id: 131, section: "Advanced", question: "'Despite being tired, she finished her work.' What does 'Despite' mean here?", options: ["Because", "Although/Even though", "Therefore", "However"], answer: "Although/Even though", explanation: "'Despite' = in spite of; shows concession" },
      { id: 132, section: "Advanced", question: "Choose the best word: The scientist _____ a new theory.", options: ["proposed", "proposing", "has proposing", "is propose"], answer: "proposed", explanation: "Simple past: discovered/proposed a theory (completed action)" },
      { id: 133, section: "Advanced", question: "Which sentence is grammatically correct?", options: ["Between you and I", "Between you and me", "Between us two", "Between we two"], answer: "Between you and me", explanation: "After preposition 'between', use objective pronoun 'me' not 'I'" },
      { id: 134, section: "Advanced", question: "Choose correct: I wish I _____ a millionaire.", options: ["am", "was", "were", "have been"], answer: "were", explanation: "Subjunctive mood: 'I wish + were' (for unreal present situations)" },
      { id: 135, section: "Advanced", question: "What is the correct form? She suggested _____ together.", options: ["to study", "studying", "study", "studied"], answer: "studying", explanation: "'Suggest' takes gerund: suggest + V-ing" },
      { id: 136, section: "Advanced", question: "Complete: Had he studied harder, he _____ passed.", options: ["would have", "will have", "would", "could"], answer: "would have", explanation: "Type 3 conditional: Had + Past Perfect, would have + V3" },
      { id: 137, section: "Advanced", question: "Identify the error: 'She has been waiting since three hours.'", options: ["She has been", "waiting", "since", "three hours"], answer: "since", explanation: "'For' is used with duration; 'since' with point in time: for three hours" },
      { id: 138, section: "Advanced", question: "'Procrastination is the thief of time.' 'Procrastination' means:", options: ["Planning well", "Delaying unnecessarily", "Organizing tasks", "Working efficiently"], answer: "Delaying unnecessarily", explanation: "Procrastinate = काम को टालते रहना - delaying tasks that should be done" },
      { id: 139, section: "Advanced", question: "Which sentence is in the subjunctive mood?", options: ["I am here.", "If it rains, I will stay.", "I suggest that he be present.", "He has finished."], answer: "I suggest that he be present.", explanation: "Subjunctive: suggest/recommend/insist that + subject + be (base form)" },
      { id: 140, section: "Advanced", question: "Choose the correct relative pronoun: She is the woman _____ helped me.", options: ["which", "whom", "who", "whose"], answer: "who", explanation: "'Who' is used for people as subject of relative clause" },
      // MIXED QUESTIONS (141-200)
      { id: 141, section: "Mixed", question: "The V3 of 'choose' is:", options: ["Chose", "Choosen", "Chosen", "Choosing"], answer: "Chosen", explanation: "Choose → Chose → Chosen" },
      { id: 142, section: "Mixed", question: "'Philanthropy' means:", options: ["Love of money", "Love of humanity / charity work", "Love of animals", "Love of art"], answer: "Love of humanity / charity work", explanation: "Philanthropy = परोपकार - desire to help others, especially financially" },
      { id: 143, section: "Mixed", question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], answer: "8", explanation: "8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune" },
      { id: 144, section: "Mixed", question: "Complete: She _____ here since 2010.", options: ["lives", "lived", "has been living", "is living"], answer: "has been living", explanation: "Continuous action from 2010 to now: Present Perfect Continuous" },
      { id: 145, section: "Mixed", question: "What is 'Onomatopoeia'?", options: ["Comparing two unlike things", "Words that imitate sounds", "Exaggerating for effect", "Repetition of initial sounds"], answer: "Words that imitate sounds", explanation: "Onomatopoeia = words whose sound suggests their meaning: buzz, hiss, splash" },
      { id: 146, section: "Mixed", question: "Which punctuation mark is used after an independent clause to connect a related clause?", options: ["Comma (,)", "Semicolon (;)", "Colon (:)", "Hyphen (-)"], answer: "Semicolon (;)", explanation: "Semicolons connect two closely related independent clauses" },
      { id: 147, section: "Mixed", question: "The study of stars and celestial objects is:", options: ["Astrology", "Astronomy", "Geography", "Meteorology"], answer: "Astronomy", explanation: "Astronomy = खगोल विज्ञान; Astrology = ज्योतिष (fortune-telling through stars)" },
      { id: 148, section: "Mixed", question: "'Caterpillar' eventually becomes:", options: ["Moth or Butterfly", "Bee", "Ant", "Dragonfly"], answer: "Moth or Butterfly", explanation: "Caterpillar = larva stage that transforms into butterfly or moth through metamorphosis" },
      { id: 149, section: "Mixed", question: "What does 'Export' mean in trade?", options: ["Buying goods from abroad", "Selling goods to other countries", "Making goods locally", "Storing goods"], answer: "Selling goods to other countries", explanation: "Export = निर्यात - sending goods abroad for sale" },
      { id: 150, section: "Mixed", question: "Which is correct?", options: ["Advise me a book. (Advise = verb)", "She gave me an advice.", "He gave me good advice.", "She adviced me."], answer: "He gave me good advice.", explanation: "'Advice' is uncountable noun; 'advise' is the verb form" },
      { id: 151, section: "Mixed", question: "What does 'Serendipity' mean?", options: ["Planned outcome", "Lucky unexpected discovery", "Hard work", "Disappointment"], answer: "Lucky unexpected discovery", explanation: "Serendipity = अचानक खुशकिस्मत खोज - finding good things not looked for" },
      { id: 152, section: "Mixed", question: "Correct form: He _____ (complete) the work before I arrived.", options: ["completed", "has completed", "had completed", "was completing"], answer: "had completed", explanation: "Past Perfect: action completed before another past action" },
      { id: 153, section: "Mixed", question: "The synonym of 'Brevity' is:", options: ["Length", "Conciseness", "Verbosity", "Complexity"], answer: "Conciseness", explanation: "Brevity = संक्षिप्तता - quality of using few words effectively" },
      { id: 154, section: "Mixed", question: "What is the full form of 'FAQ'?", options: ["Few Answer Questions", "Frequently Asked Questions", "First Asked Questions", "Fast Answer Query"], answer: "Frequently Asked Questions", explanation: "FAQ = Frequently Asked Questions - common in websites and documents" },
      { id: 155, section: "Mixed", question: "Hindi of 'Perseverance':", options: ["सुस्ती", "विनम्रता", "दृढ़ता / लगन", "उदारता"], answer: "दृढ़ता / लगन", explanation: "Perseverance = continued effort despite difficulties" },
      { id: 156, section: "Mixed", question: "Which is the correct sentence?", options: ["She don't know him.", "She doesn't knows him.", "She doesn't know him.", "She not know him."], answer: "She doesn't know him.", explanation: "Third person singular negative: doesn't + V1" },
      { id: 157, section: "Mixed", question: "What is a 'Palindrome'?", options: ["Word spelled same forwards and backwards", "Word with many meanings", "Longest word in dictionary", "Word borrowed from another language"], answer: "Word spelled same forwards and backwards", explanation: "Palindrome = word/phrase reading same both ways: racecar, level, madam" },
      { id: 158, section: "Mixed", question: "The word 'Ambiguous' means:", options: ["Clear and direct", "Having two or more possible meanings", "Simple", "Obvious"], answer: "Having two or more possible meanings", explanation: "Ambiguous = अस्पष्ट - unclear, can be interpreted in multiple ways" },
      { id: 159, section: "Mixed", question: "Which modal expresses certainty?", options: ["Might", "May", "Could", "Must"], answer: "Must", explanation: "'Must' expresses strong certainty/obligation" },
      { id: 160, section: "Mixed", question: "In which month does the Indian monsoon typically arrive?", options: ["March", "May", "June", "August"], answer: "June", explanation: "Southwest monsoon typically arrives in Kerala in June" },
      { id: 161, section: "Mixed", question: "The plural of 'Medium' is:", options: ["Mediums", "Media", "Mediuns", "Medias"], answer: "Media", explanation: "Medium → Media (Latin plural, used in 'mass media')" },
      { id: 162, section: "Mixed", question: "Choose the correct meaning of 'Procrastinate':", options: ["To work efficiently", "To delay/postpone tasks", "To organize well", "To complete on time"], answer: "To delay/postpone tasks", explanation: "Procrastinate = काम टालना - to delay doing something" },
      { id: 163, section: "Mixed", question: "What is 'Inflation' in economics?", options: ["Fall in prices", "Rise in overall prices", "Fixed interest rate", "Government tax"], answer: "Rise in overall prices", explanation: "Inflation = मुद्रास्फीति - general increase in prices over time" },
      { id: 164, section: "Mixed", question: "Select the correct sentence:", options: ["I have seen him yesterday.", "I saw him yesterday.", "I see him yesterday.", "I seen him yesterday."], answer: "I saw him yesterday.", explanation: "'Yesterday' requires Simple Past, not Present Perfect" },
      { id: 165, section: "Mixed", question: "What does 'Biodiversity' mean?", options: ["Single species", "Variety of life forms on Earth", "Pollution of environment", "Industrial growth"], answer: "Variety of life forms on Earth", explanation: "Biodiversity = जैव विविधता - variety of plants, animals, and other organisms" },
      { id: 166, section: "Mixed", question: "Identify the type: 'She is as wise as an owl.' is a:", options: ["Metaphor", "Personification", "Simile", "Oxymoron"], answer: "Simile", explanation: "Simile uses 'as...as' or 'like' for comparison" },
      { id: 167, section: "Mixed", question: "'Notorious' and 'Famous' differ because:", options: ["They mean the same thing", "Notorious = negatively known; Famous = positively known", "Notorious is rare; Famous is common", "Notorious is older English"], answer: "Notorious = negatively known; Famous = positively known", explanation: "Notorious = कुख्यात (known for bad things); Famous = प्रसिद्ध (known for good things)" },
      { id: 168, section: "Mixed", question: "The synonym of 'Verbose' is:", options: ["Concise", "Brief", "Wordy", "Silent"], answer: "Wordy", explanation: "Verbose = बहुत अधिक शब्दों का उपयोग करने वाला - using more words than necessary" },
      { id: 169, section: "Mixed", question: "Which is the National Animal of India?", options: ["Lion", "Elephant", "Tiger", "Peacock"], answer: "Tiger", explanation: "Bengal Tiger (बाघ) is India's national animal since 1973" },
      { id: 170, section: "Mixed", question: "Complete this proverb: 'Practice makes ___.'", options: ["perfect", "possible", "progress", "power"], answer: "perfect", explanation: "Practice makes perfect = नियमित अभ्यास से कुशलता आती है" },
      { id: 171, section: "Mixed", question: "Which is a subordinating conjunction?", options: ["And", "But", "Although", "Or"], answer: "Although", explanation: "'Although' is subordinating conjunction showing concession" },
      { id: 172, section: "Mixed", question: "The V3 of 'steal' is:", options: ["Stealed", "Stole", "Stolen", "Steeling"], answer: "Stolen", explanation: "Steal → Stole → Stolen (irregular verb)" },
      { id: 173, section: "Mixed", question: "'Eminent' means:", options: ["Unknown", "Famous and respected", "Ordinary", "Dangerous"], answer: "Famous and respected", explanation: "Eminent = प्रख्यात - famous and respected in a field" },
      { id: 174, section: "Mixed", question: "What is 'Tsunami'?", options: ["A type of storm", "A large ocean wave caused by earthquake", "A type of flood", "A cyclone"], answer: "A large ocean wave caused by earthquake", explanation: "Tsunami = सुनामी - series of powerful ocean waves caused by undersea earthquake" },
      { id: 175, section: "Mixed", question: "Choose correct: She is the best student _____ the class.", options: ["of", "in", "at", "for"], answer: "in", explanation: "'In the class' - within a group/place" },
      { id: 176, section: "Mixed", question: "A 'Bibliography' is:", options: ["A life story", "A list of books/sources consulted", "A government document", "A type of essay"], answer: "A list of books/sources consulted", explanation: "Bibliography = संदर्भ ग्रंथसूची - list of sources used in research" },
      { id: 177, section: "Mixed", question: "'Humanitarian' means:", options: ["Relating to space", "Relating to helping people", "Relating to animals", "Relating to machines"], answer: "Relating to helping people", explanation: "Humanitarian = मानवतावादी - concerned with human welfare" },
      { id: 178, section: "Mixed", question: "Which is correct: 'I am senior _____ you.'", options: ["than", "to", "from", "by"], answer: "to", explanation: "'Senior', 'junior', 'superior', 'inferior' use 'to' not 'than'" },
      { id: 179, section: "Mixed", question: "'Inevitable' means:", options: ["Avoidable", "Uncertain", "Cannot be avoided", "Unexpected"], answer: "Cannot be avoided", explanation: "Inevitable = अनिवार्य - certain to happen; unavoidable" },
      { id: 180, section: "Mixed", question: "What does 'Nominate' mean?", options: ["To reject", "To suggest someone for a position or award", "To arrest", "To criticize"], answer: "To suggest someone for a position or award", explanation: "Nominate = नामांकित करना - to formally propose someone for a role or award" },
      { id: 181, section: "Mixed", question: "Choose correct article: _____ Taj Mahal is a beautiful monument.", options: ["A", "An", "The", "No article"], answer: "The", explanation: "'The' is used before unique, well-known monuments and landmarks" },
      { id: 182, section: "Mixed", question: "What is 'Consensus'?", options: ["Disagreement", "Agreement among a group", "A type of survey", "A political party"], answer: "Agreement among a group", explanation: "Consensus = सहमति - general agreement of a group" },
      { id: 183, section: "Mixed", question: "Past tense of 'Forbid':", options: ["Forbided", "Forbad/Forbade", "Forbidden", "Forbidded"], answer: "Forbad/Forbade", explanation: "Forbid → Forbade → Forbidden (irregular verb)" },
      { id: 184, section: "Mixed", question: "What is 'Pedagogy'?", options: ["Study of birds", "Method and practice of teaching", "Study of rocks", "Study of languages"], answer: "Method and practice of teaching", explanation: "Pedagogy = शिक्षाशास्त्र - science and art of teaching" },
      { id: 185, section: "Mixed", question: "'He is all bark and no bite' means:", options: ["He has a dog", "He threatens but doesn't act", "He bites people", "He is very aggressive"], answer: "He threatens but doesn't act", explanation: "Idiom: 'all bark and no bite' = someone who makes threats but doesn't follow through" },
      { id: 186, section: "Mixed", question: "Which sentence correctly uses 'whom'?", options: ["Who did you see?", "Whom did you see?", "Who should I contact?", "Who is coming?"], answer: "Whom did you see?", explanation: "'Whom' is used as object pronoun (you saw whom?) - object position" },
      { id: 187, section: "Mixed", question: "'Versatile' means:", options: ["Limited", "Specialized in one field", "Able to do many things well", "Outdated"], answer: "Able to do many things well", explanation: "Versatile = बहुमुखी प्रतिभावान - able to adapt to many different functions" },
      { id: 188, section: "Mixed", question: "What is 'Euphemism'?", options: ["A figure of speech using exaggeration", "A mild expression used instead of a harsh one", "Repetition of sounds", "Comparison using 'like'"], answer: "A mild expression used instead of a harsh one", explanation: "Euphemism = a polite word for something unpleasant: 'passed away' for 'died'" },
      { id: 189, section: "Mixed", question: "The antonym of 'Loquacious' is:", options: ["Talkative", "Verbose", "Taciturn", "Eloquent"], answer: "Taciturn", explanation: "Loquacious = very talkative; Taciturn = habitually silent" },
      { id: 190, section: "Mixed", question: "'Cogent' argument means:", options: ["Weak argument", "Clear, logical, convincing argument", "Emotional argument", "Irrelevant argument"], answer: "Clear, logical, convincing argument", explanation: "Cogent = तर्कसंगत/प्रभावशाली - powerfully persuasive" },
      { id: 191, section: "Mixed", question: "Choose correct preposition: She died _____ cancer.", options: ["from", "of", "with", "by"], answer: "of", explanation: "'Die of' a disease is the correct usage" },
      { id: 192, section: "Mixed", question: "Which word is a CONJUNCTION?", options: ["Quickly", "Beautiful", "Although", "Jump"], answer: "Although", explanation: "'Although' joins clauses and is a subordinating conjunction" },
      { id: 193, section: "Mixed", question: "The literary device in 'The sun smiled upon the earth' is:", options: ["Simile", "Personification", "Metaphor", "Alliteration"], answer: "Personification", explanation: "Sun 'smiled' = giving human quality to a non-human object" },
      { id: 194, section: "Mixed", question: "Complete: 'Absence makes the heart grow _____.'", options: ["cold", "fonder", "smaller", "stronger"], answer: "fonder", explanation: "Proverb: Absence makes the heart grow fonder = दूरी प्यार बढ़ाती है" },
      { id: 195, section: "Mixed", question: "'Ephemeral' means:", options: ["Permanent", "Lasting only a short time", "Very important", "Ancient"], answer: "Lasting only a short time", explanation: "Ephemeral = क्षणिक/अल्पकालिक - lasting for a very short time" },
      { id: 196, section: "Mixed", question: "Which sentence uses 'effect' correctly?", options: ["The medicine effected her positively.", "What effect did the medicine have?", "The rain effected the match.", "Effect me with your decision."], answer: "What effect did the medicine have?", explanation: "Effect = noun (result); Affect = verb (to influence)" },
      { id: 197, section: "Mixed", question: "What does 'Omniscient' mean?", options: ["Knowing nothing", "Knowing everything", "Seeing everything", "Feeling everything"], answer: "Knowing everything", explanation: "Omniscient = सर्वज्ञ - knowing everything (God is omniscient)" },
      { id: 198, section: "Mixed", question: "The past tense of 'Lie' (to recline) is:", options: ["Lied", "Lay", "Lain", "Lying"], answer: "Lay", explanation: "Lie (recline) → Lay → Lain; Lie (tell untruth) → Lied → Lied" },
      { id: 199, section: "Mixed", question: "What does '75 Days Hard English' primarily aim to achieve?", options: ["Learn coding", "Master English communication", "Learn a new language", "Improve mathematics"], answer: "Master English communication", explanation: "75 Days Hard English is designed to build comprehensive English language skills" },
      { id: 200, section: "Mixed", question: "On completing 75 Days Hard English, you have mastered:", options: ["Basic English only", "Grammar, Vocabulary, Writing, Speaking and Reading skills", "Only speaking skills", "Only grammar rules"], answer: "Grammar, Vocabulary, Writing, Speaking and Reading skills", explanation: "The 75-day program covers all aspects: Grammar, Vocabulary, Writing, Speaking, Reading - making you a complete English communicator!" },
    ],
    revisionNotes: {
      grammarSummary: "Complete grammar: Tenses (12), Articles, Prepositions, Modals, Active/Passive Voice, Direct/Indirect Speech, Conditional Sentences, Clauses, Subject-Verb Agreement, Pronouns, Adjectives, Adverbs, Conjunctions, Interjections",
      vocabularySummary: "500+ words across: Nouns, Adjectives, Professions, Food, Weather, Relations, Body Parts, Diseases, Industry, Legal, Colours, Birds, Flowers, Fruits, Stationery, Maths, Insects, Buildings",
      writingSummary: "Applications, Letters (Formal/Informal), Emails (all types), Paragraphs, Notices, Essays",
      speakingSummary: "Self introduction, Conversation skills, Phone etiquette, Presentations, Interviews",
    },
    scoringGuide: {
      total: 200,
      grading: [
        { range: "180-200", grade: "A+ (Outstanding)", remark: "Excellent! You are ready for any English challenge!" },
        { range: "160-179", grade: "A (Excellent)", remark: "Very good command over English. Keep practicing!" },
        { range: "140-159", grade: "B+ (Very Good)", remark: "Good performance. Work on weaker areas." },
        { range: "120-139", grade: "B (Good)", remark: "Satisfactory. Revise grammar and vocabulary." },
        { range: "100-119", grade: "C (Average)", remark: "Average performance. Need more practice." },
        { range: "Below 100", grade: "Needs Improvement", remark: "Revise from Day 1. Focus on basics." },
      ],
    },
    certificate: {
      title: "75 Days Hard English - Certificate of Completion",
      criteria: [
        "Complete all 75 days of learning",
        "Score minimum 60% in daily exercises",
        "Score minimum 70% in the final mock test (140/200)",
        "Complete all writing assignments (Application, Letter, Email, Paragraph, Notice)",
        "Participate in at least 10 speaking exercises",
      ],
      levels: [
        { score: "180-200", level: "English Expert", badge: "🏆 Gold Certificate" },
        { score: "160-179", level: "Advanced Learner", badge: "🥈 Silver Certificate" },
        { score: "140-159", level: "Proficient Speaker", badge: "🥉 Bronze Certificate" },
        { score: "120-139", level: "Competent User", badge: "✅ Completion Certificate" },
      ],
      message: "Congratulations on completing the 75 Days Hard English program! You have shown remarkable dedication and commitment to mastering the English language. This journey has equipped you with comprehensive grammar knowledge, a rich vocabulary, excellent writing skills, and the confidence to communicate effectively in English. Remember: Language learning is a lifelong journey. Keep reading, writing, speaking, and listening to English every day. The skills you have built over these 75 days will open doors to better opportunities, broader horizons, and richer connections. You've earned this! — 75 Days Hard English Team",
    },
  },

};

export default DAYS_56_TO_75;
