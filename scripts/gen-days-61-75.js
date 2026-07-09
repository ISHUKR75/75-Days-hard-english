const fs = require('fs');
const path = require('path');

const DATA = {
  '61': {
    topic: 'Buildings, Worms & Insects Vocabulary',
    formula: 'Subject + verb + building/insect noun (+ location/adjective)',
    rule: [
      "Building nouns (building, hospital, temple, bridge, tower, factory, mall) usually take 'the' when specific",
      "Insect/worm nouns (ant, mosquito, cockroach, spider, butterfly, bee, fly, termite, earthworm, caterpillar) are usually countable",
      "Use plural + 's' for general statements about insects (Ants walk / Bees make honey)",
      "Location phrases (in the kitchen, on the flower, over the river) follow the noun",
    ],
    pairs: [
      ['यह एक बड़ी इमारत है।', 'This is a big building.'],
      ['अस्पताल शहर के बीच में है।', 'The hospital is in the middle of the city.'],
      ['मंदिर बहुत पुराना है।', 'The temple is very old.'],
      ['पुल नदी के ऊपर बना है।', 'The bridge is built over the river.'],
      ['फैक्ट्री में बहुत शोर है।', 'There is a lot of noise in the factory.'],
      ['मॉल में बहुत सारी दुकानें हैं।', 'There are many shops in the mall.'],
      ['टावर बहुत ऊँचा है।', 'The tower is very tall.'],
      ['स्कूल की इमारत नई है।', 'The school building is new.'],
      ['चींटियाँ जमीन पर चल रही हैं।', 'Ants are walking on the ground.'],
      ['मच्छर रात में काटते हैं।', 'Mosquitoes bite at night.'],
      ['तिलचट्टा रसोई में छिपा है।', 'The cockroach is hiding in the kitchen.'],
      ['मकड़ी ने जाला बुना।', 'The spider wove a web.'],
      ['तितली फूल पर बैठी है।', 'The butterfly is sitting on the flower.'],
      ['मधुमक्खियाँ शहद बनाती हैं।', 'Bees make honey.'],
      ['मक्खी खाने पर बैठ गई।', 'The fly sat on the food.'],
      ['दीमक लकड़ी खा जाती है।', 'Termites eat wood.'],
      ['केंचुआ मिट्टी को उपजाऊ बनाता है।', 'The earthworm makes the soil fertile.'],
      ['कैटरपिलर पत्तियाँ खाता है।', 'The caterpillar eats leaves.'],
      ['यह भवन सरकारी कार्यालय है।', 'This building is a government office.'],
      ['कीड़े बारिश के बाद निकलते हैं।', 'Insects come out after the rain.'],
    ],
  },
  '62': {
    topic: 'Flowers & Fruits Vocabulary',
    formula: 'Subject + be-verb/verb + flower/fruit noun (+ colour/quality)',
    rule: [
      "Flower nouns (rose, lotus, sunflower, jasmine, marigold, lily, tulip, hibiscus) often pair with colour adjectives",
      "Fruit nouns (mango, banana, apple, orange, grape, watermelon, papaya, guava) are used with health/taste adjectives",
      "'grows in/blooms in' describes where or when a flower appears",
      "Uncountable use for fruit as food (I like mango) vs countable use for individual fruits (two mangoes)",
    ],
    pairs: [
      ['गुलाब का फूल लाल है।', 'The rose flower is red.'],
      ['कमल पानी में उगता है।', 'The lotus grows in water.'],
      ['सूरजमुखी सूरज की तरफ मुड़ता है।', 'The sunflower turns towards the sun.'],
      ['चमेली की खुशबू बहुत अच्छी है।', "The jasmine's fragrance is very nice."],
      ['गेंदे के फूल पूजा में इस्तेमाल होते हैं।', 'Marigold flowers are used in worship.'],
      ['लिली सफेद रंग की होती है।', 'The lily is white in colour.'],
      ['ट्यूलिप वसंत में खिलते हैं।', 'Tulips bloom in spring.'],
      ['गुड़हल का फूल औषधीय होता है।', 'The hibiscus flower is medicinal.'],
      ['आम गर्मियों का फल है।', 'Mango is a summer fruit.'],
      ['केला ऊर्जा से भरपूर होता है।', 'Banana is full of energy.'],
      ['सेब सेहत के लिए अच्छा है।', 'Apple is good for health.'],
      ['संतरे में विटामिन सी होता है।', 'Orange contains vitamin C.'],
      ['अंगूर छोटे और मीठे होते हैं।', 'Grapes are small and sweet.'],
      ['तरबूज गर्मियों में ठंडक देता है।', 'Watermelon gives coolness in summer.'],
      ['पपीता पाचन के लिए अच्छा है।', 'Papaya is good for digestion.'],
      ['अमरूद सस्ता और पौष्टिक फल है।', 'Guava is a cheap and nutritious fruit.'],
      ['मुझे फूलों का बगीचा पसंद है।', 'I like a garden of flowers.'],
      ['बाजार में ताजे फल मिलते हैं।', 'Fresh fruits are available in the market.'],
      ['वह हर सुबह फल खाती है।', 'She eats fruit every morning.'],
      ['यह फूल बहुत खुशबूदार है।', 'This flower is very fragrant.'],
    ],
  },
  '63': {
    topic: 'Maths Vocabulary',
    formula: 'Number/shape noun + be-verb/verb + maths term (+ result)',
    rule: [
      "Operations (addition, subtraction, multiplication, division) pair with 'adding/subtracting/multiplying/dividing'",
      "Shape nouns (triangle, square, circle) describe sides/angles with 'has/have'",
      "Percentage and average use 'percent' and 'average' as fixed collocations",
      "Area and perimeter are always followed by measurement units",
    ],
    pairs: [
      ['दो और तीन जोड़ने पर पाँच होता है।', 'Adding two and three gives five.'],
      ['दस में से चार घटाने पर छह बचता है।', 'Subtracting four from ten leaves six.'],
      ['तीन को चार से गुणा करने पर बारह होता है।', 'Multiplying three by four gives twelve.'],
      ['बीस को चार से भाग देने पर पाँच होता है।', 'Dividing twenty by four gives five.'],
      ['यह एक सम संख्या है।', 'This is an even number.'],
      ['आधा एक भिन्न है।', 'Half is a fraction.'],
      ['उसे परीक्षा में नब्बे प्रतिशत अंक मिले।', 'He got ninety percent marks in the exam.'],
      ['उनकी औसत ऊँचाई पाँच फीट है।', 'Their average height is five feet.'],
      ['त्रिभुज की तीन भुजाएँ होती हैं।', 'A triangle has three sides.'],
      ['वर्ग की सभी भुजाएँ बराबर होती हैं।', 'All sides of a square are equal.'],
      ['वृत्त की कोई भुजा नहीं होती।', 'A circle has no sides.'],
      ['यह समीकरण हल करना आसान है।', 'This equation is easy to solve.'],
      ['यह कोण नब्बे डिग्री का है।', 'This angle is ninety degrees.'],
      ['कमरे का क्षेत्रफल बीस वर्ग मीटर है।', 'The area of the room is twenty square metres.'],
      ['बगीचे की परिधि सौ मीटर है।', 'The perimeter of the garden is one hundred metres.'],
      ['गणित मेरा पसंदीदा विषय है।', 'Maths is my favourite subject.'],
      ['वह जल्दी और सही गणना करता है।', 'He calculates quickly and correctly.'],
      ['यह संख्या सबसे बड़ी है।', 'This number is the largest.'],
      ['हमें यह सवाल हल करना है।', 'We have to solve this problem.'],
      ['शिक्षक ने गुणा सिखाया।', 'The teacher taught multiplication.'],
    ],
  },
  '64': {
    topic: 'Body & Diseases Vocabulary',
    formula: 'Possessive + body part + be-verb/verb (+ pain/condition) | Subject + has + disease',
    rule: [
      "Body part pain uses 'have + a + ...ache' (headache, stomachache) or 'my ... hurts/is aching'",
      "'has/have' introduces a disease/condition (He has diabetes / I have a cold)",
      "'sore throat' and 'high fever' are fixed adjective + noun collocations",
      "'allergic to' + noun describes an allergy",
    ],
    pairs: [
      ['मेरे सिर में दर्द है।', 'I have a headache.'],
      ['उसकी आँखें बहुत सुंदर हैं।', 'Her eyes are very beautiful.'],
      ['मेरे कान में दर्द हो रहा है।', 'My ear is hurting.'],
      ['उसकी नाक बह रही है।', 'His nose is running.'],
      ['मेरा हाथ जल गया।', 'My hand got burnt.'],
      ['उसका पैर टूट गया।', 'His leg is broken.'],
      ['उसका दिल बहुत अच्छा है।', 'He has a very kind heart.'],
      ['मेरा पेट दर्द कर रहा है।', 'My stomach is aching.'],
      ['मेरी पीठ में दर्द है।', 'I have back pain.'],
      ['मेरा गला खराब है।', 'I have a sore throat.'],
      ['उसे तेज़ बुखार है।', 'He has a high fever.'],
      ['मुझे जुकाम हो गया है।', 'I have caught a cold.'],
      ['उसे खांसी आ रही है।', 'He is coughing.'],
      ['मुझे सिरदर्द हो रहा है।', 'I am having a headache.'],
      ['उसे मधुमेह है।', 'He has diabetes.'],
      ['मलेरिया मच्छरों से फैलता है।', 'Malaria spreads from mosquitoes.'],
      ['मुझे धूल से एलर्जी है।', 'I am allergic to dust.'],
      ['उसे संक्रमण हो गया है।', 'He has an infection.'],
      ['डॉक्टर ने दवा दी।', 'The doctor gave medicine.'],
      ['स्वस्थ रहने के लिए व्यायाम करो।', 'Exercise to stay healthy.'],
    ],
  },
  '65': {
    topic: 'Industry Vocabulary',
    formula: 'Subject (factory/company/industry) + verb + industrial noun (+ scale/detail)',
    rule: [
      "'manufacture/produce' + noun describes what a factory makes",
      "'import' = bring goods in, 'export' = send goods out — object always follows",
      "'quality control' and 'supply chain' are fixed two-word industry terms",
      "Passive voice is common in industry contexts (raw material is imported)",
    ],
    pairs: [
      ['यह फैक्ट्री कपड़े बनाती है।', 'This factory manufactures clothes.'],
      ['मशीन दिन-रात चलती है।', 'The machine runs day and night.'],
      ['मजदूर मेहनत से काम करते हैं।', 'Workers work hard.'],
      ['उत्पादन बढ़ गया है।', 'Production has increased.'],
      ['मैनेजर टीम को निर्देश देता है।', 'The manager gives instructions to the team.'],
      ['यह उद्योग तेजी से बढ़ रहा है।', 'This industry is growing rapidly.'],
      ['हम कच्चा माल विदेश से मंगाते हैं।', 'We import raw material from abroad.'],
      ['भारत कपड़े दूसरे देशों को निर्यात करता है।', 'India exports clothes to other countries.'],
      ['निर्माण प्रक्रिया जटिल है।', 'The manufacturing process is complex.'],
      ['गुणवत्ता नियंत्रण जरूरी है।', 'Quality control is necessary.'],
      ['आपूर्ति श्रृंखला में देरी हुई।', 'There was a delay in the supply chain.'],
      ['कंपनी नए संयंत्र लगा रही है।', 'The company is setting up a new plant.'],
      ['श्रमिकों को सुरक्षा उपकरण चाहिए।', 'Workers need safety equipment.'],
      ['यह उद्योग रोजगार पैदा करता है।', 'This industry creates employment.'],
      ['उत्पाद की मांग बढ़ी है।', 'The demand for the product has increased.'],
      ['फैक्ट्री में नई तकनीक लगाई गई।', 'New technology was installed in the factory.'],
      ['यह कंपनी बड़े पैमाने पर उत्पादन करती है।', 'This company produces on a large scale.'],
      ['मशीनों का रखरखाव जरूरी है।', 'Maintenance of machines is necessary.'],
      ['उद्योग को सरकार से सहायता मिली।', 'The industry received help from the government.'],
      ['यह उत्पाद अंतरराष्ट्रीय बाजार में बिकता है।', 'This product sells in the international market.'],
    ],
  },
  '66': {
    topic: 'Colours & Judiciary Vocabulary',
    formula: 'Noun + be-verb + colour (+ symbolism) | Court/legal noun + verb (+ legal action)',
    rule: [
      "Colour adjectives come before nouns (a red flower) or after be-verb (the flower is red)",
      "'symbol of' + noun expresses what a colour represents",
      "Judiciary verbs: a judge 'announces a verdict', a lawyer 'argues a case', a witness 'testifies'",
      "'found guilty/not guilty' is the fixed court verdict phrase",
    ],
    pairs: [
      ['लाल रंग खतरे का प्रतीक है।', 'Red colour is a symbol of danger.'],
      ['आसमान नीला दिखता है।', 'The sky looks blue.'],
      ['हरा रंग शांति का प्रतीक है।', 'Green colour is a symbol of peace.'],
      ['उसने पीली शर्ट पहनी है।', 'He is wearing a yellow shirt.'],
      ['काला रंग सबको पसंद है।', 'Everyone likes black colour.'],
      ['सफेद रंग शुद्धता दर्शाता है।', 'White colour represents purity.'],
      ['यह फूल नारंगी रंग का है।', 'This flower is orange in colour.'],
      ['बैंगनी रंग शाही माना जाता है।', 'Purple colour is considered royal.'],
      ['उसे गुलाबी रंग बहुत पसंद है।', 'She likes pink colour a lot.'],
      ['भूरे रंग की मिट्टी उपजाऊ होती है।', 'Brown coloured soil is fertile.'],
      ['अदालत में सुनवाई चल रही है।', 'The hearing is going on in the court.'],
      ['जज ने फैसला सुनाया।', 'The judge announced the verdict.'],
      ['वकील ने बहस की।', 'The lawyer argued the case.'],
      ['कानून सबके लिए समान है।', 'The law is equal for everyone.'],
      ['न्याय में देरी नहीं होनी चाहिए।', 'There should be no delay in justice.'],
      ['गवाह ने सच बताया।', 'The witness told the truth.'],
      ['सबूत अदालत में पेश किए गए।', 'Evidence was presented in the court.'],
      ['मुकदमा तीन साल चला।', 'The trial went on for three years.'],
      ['जूरी ने फैसला किया।', 'The jury made the decision.'],
      ['अदालत ने आरोपी को दोषी पाया।', 'The court found the accused guilty.'],
    ],
  },
  '67': {
    topic: 'Birds & Astrology Vocabulary',
    formula: 'Bird noun + verb (+ location/sound) | Subject + verb + astrology noun',
    rule: [
      "Bird verbs: fly, sing, sit, swim, lay eggs — matched to the specific bird",
      "'national bird' and 'symbol of peace' are fixed descriptive phrases",
      "Astrology terms: horoscope, zodiac sign, moon sign, prediction, fortune",
      "'check/read a horoscope' and 'come true' (for predictions) are common collocations",
    ],
    pairs: [
      ['तोता हरे रंग का होता है।', 'The parrot is green in colour.'],
      ['गौरैया छत पर बैठी है।', 'The sparrow is sitting on the roof.'],
      ['मोर भारत का राष्ट्रीय पक्षी है।', "The peacock is India's national bird."],
      ['कौआ बहुत तेज आवाज करता है।', 'The crow makes a very loud sound.'],
      ['कबूतर शांति का प्रतीक है।', 'The pigeon is a symbol of peace.'],
      ['चील ऊँची उड़ान भरती है।', 'The eagle flies very high.'],
      ['उल्लू रात में जागता है।', 'The owl stays awake at night.'],
      ['कोयल मीठा गाती है।', 'The cuckoo sings sweetly.'],
      ['हंस झील में तैर रहा है।', 'The swan is swimming in the lake.'],
      ['मुर्गी अंडे देती है।', 'The hen lays eggs.'],
      ['उसने अपनी राशि जांची।', 'She checked her horoscope.'],
      ['मेरी राशि सिंह है।', 'My zodiac sign is Leo.'],
      ['आज रात आसमान में तारे साफ दिखे।', 'The stars were clearly visible in the sky tonight.'],
      ['यह ग्रह पृथ्वी से बड़ा है।', 'This planet is bigger than Earth.'],
      ['ज्योतिषी ने भविष्य बताया।', 'The astrologer told the future.'],
      ['उसकी भविष्यवाणी सच हुई।', 'His prediction came true.'],
      ['किस्मत सबके साथ अलग होती है।', 'Fortune is different for everyone.'],
      ['उसका चंद्र राशि कर्क है।', 'His moon sign is Cancer.'],
      ['पक्षी सुबह जल्दी उठते हैं।', 'Birds wake up early in the morning.'],
      ['आकाश में कई पक्षी उड़ रहे हैं।', 'Many birds are flying in the sky.'],
    ],
  },
  '68': {
    topic: 'Factory & Sports + Sound & Maths Vocabulary',
    formula: 'Team/player + verb + sports noun | Sound adjective + noun | Number + multiply/divide + number',
    rule: [
      "Sports collocations: 'play a sport', 'win/lose a match', 'score a goal'",
      "Sound adjectives (loud, soft) describe voice/noise; 'silence' and 'echo' are nouns",
      "Maths operation review: multiply, divide, total — same pattern as Day 63",
      "Factory + sports + sound + maths words often combine in real workplace/stadium contexts",
    ],
    pairs: [
      ['फैक्ट्री की असेंबली लाइन तेज़ चलती है।', "The factory's assembly line runs fast."],
      ['क्रिकेट भारत में सबसे लोकप्रिय खेल है।', 'Cricket is the most popular sport in India.'],
      ['फुटबॉल टीम ने मैच जीता।', 'The football team won the match.'],
      ['हॉकी हमारा राष्ट्रीय खेल है।', 'Hockey is our national game.'],
      ['बैडमिंटन खेलना मुझे पसंद है।', 'I like playing badminton.'],
      ['उसने दौड़ में पहला स्थान पाया।', 'He got first place in the race.'],
      ['खिलाड़ी मैदान में दौड़ रहे हैं।', 'The players are running on the field.'],
      ['टीम ने अच्छा प्रदर्शन किया।', 'The team performed well.'],
      ['मैच कल शाम को है।', 'The match is tomorrow evening.'],
      ['गेंद सीमा के बाहर चली गई।', 'The ball went out of the boundary.'],
      ['उसने गोल करके जीत दिलाई।', 'He scored a goal and won the match.'],
      ['यह आवाज़ बहुत तेज़ है।', 'This sound is very loud.'],
      ['उसकी आवाज़ बहुत धीमी है।', 'His voice is very soft.'],
      ['फैक्ट्री में बहुत शोर होता है।', 'There is a lot of noise in the factory.'],
      ['रात को पूरी शांति थी।', 'There was complete silence at night.'],
      ['पहाड़ों में गूंज सुनाई दी।', 'An echo was heard in the mountains.'],
      ['मुझे संगीत सुनना पसंद है।', 'I like listening to music.'],
      ['तीन को पाँच से गुणा करने पर पंद्रह होता है।', 'Multiplying three by five gives fifteen.'],
      ['बीस को पाँच से भाग देने पर चार होता है।', 'Dividing twenty by five gives four.'],
      ['कुल संख्या सौ है।', 'The total number is one hundred.'],
    ],
  },
  '69': {
    topic: 'Application Writing',
    formula: 'Salutation + purpose statement + reason + polite closing request',
    rule: [
      "Formal applications open with 'Sir/Madam' and state the purpose in the first line",
      "'I request/I would like to apply for' introduces the main ask",
      "Reasons follow with 'because/due to/as'",
      "Close politely with 'Please approve/accept' + 'Yours sincerely'",
    ],
    pairs: [
      ['महोदय, मैं आपसे तीन दिन की छुट्टी की विनती करता हूँ।', 'Sir, I request three days of leave from you.'],
      ['मैं बीमार होने के कारण छुट्टी चाहता हूँ।', 'I want leave because I am unwell.'],
      ['कृपया मेरी छुट्टी स्वीकृत करें।', 'Please approve my leave.'],
      ['मैं इस पद के लिए आवेदन करना चाहता हूँ।', 'I would like to apply for this position.'],
      ['मेरे पास इस काम का पर्याप्त अनुभव है।', 'I have sufficient experience for this job.'],
      ['कृपया मेरा आवेदन स्वीकार करें।', 'Please accept my application.'],
      ['मैं स्थानांतरण के लिए आवेदन कर रहा हूँ।', 'I am applying for a transfer.'],
      ['मेरे परिवार की वजह से मुझे शहर बदलना है।', 'I need to change my city because of my family.'],
      ['मैं छात्रवृत्ति के लिए आवेदन कर रहा हूँ।', 'I am applying for a scholarship.'],
      ['मेरे अंक इस छात्रवृत्ति के लिए पर्याप्त हैं।', 'My marks are sufficient for this scholarship.'],
      ['मुझे एक बोनाफाइड प्रमाण पत्र चाहिए।', 'I need a bonafide certificate.'],
      ['यह प्रमाण पत्र मुझे बैंक खाता खोलने के लिए चाहिए।', 'I need this certificate to open a bank account.'],
      ['सधन्यवाद, मैं आपकी शीघ्र प्रतिक्रिया की प्रतीक्षा करूँगा।', 'Thank you, I will wait for your prompt response.'],
      ['भवदीय।', 'Yours sincerely.'],
      ['मैं इस विद्यालय का छात्र हूँ।', 'I am a student of this school.'],
      ['मेरा रोल नंबर पच्चीस है।', 'My roll number is twenty-five.'],
      ['कृपया इसे तुरंत स्वीकृत करें।', 'Please approve this immediately.'],
      ['मुझे आपके सकारात्मक जवाब की उम्मीद है।', 'I hope for your positive reply.'],
      ['यह मेरा पहला आवेदन है।', 'This is my first application.'],
      ['मैं इस अवसर के लिए आभारी रहूँगा।', 'I will be grateful for this opportunity.'],
    ],
  },
  '70': {
    topic: 'Letter Writing',
    formula: 'Salutation + opening line + body (news/complaint/request) + closing signature',
    rule: [
      "Informal letters: 'Dear + name' opening, casual tone, 'love/your loving...' closing",
      "Formal letters: 'Respected Sir/Madam' opening, 'Yours faithfully' closing",
      "State the main subject in the first 1-2 lines",
      "Complaint letters clearly describe the problem and request a solution",
    ],
    pairs: [
      ['प्रिय मित्र, मुझे आशा है तुम ठीक होगे।', 'Dear friend, I hope you are well.'],
      ['मैं तुम्हें अपनी नई नौकरी के बारे में बताना चाहता हूँ।', 'I want to tell you about my new job.'],
      ['आदरणीय महोदय, मैं आपको यह पत्र शिकायत के लिए लिख रहा हूँ।', 'Respected Sir, I am writing this letter to you as a complaint.'],
      ['सड़क की हालत बहुत खराब है।', 'The condition of the road is very bad.'],
      ['कृपया इस समस्या का समाधान करें।', 'Please solve this problem.'],
      ['प्रिय माँ, मैं यहाँ ठीक हूँ।', 'Dear mother, I am fine here.'],
      ['मुझे तुम्हारी बहुत याद आती है।', 'I miss you a lot.'],
      ['आपका स्नेही पुत्र।', 'Your loving son.'],
      ['आदरणीय संपादक महोदय, मैं यह पत्र प्रकाशित करने का अनुरोध करता हूँ।', 'Respected Editor, I request you to publish this letter.'],
      ['यह समस्या पूरे शहर को प्रभावित कर रही है।', 'This problem is affecting the whole city.'],
      ['प्रिय बहन, तुम्हारी शादी की बधाई।', 'Dear sister, congratulations on your wedding.'],
      ['मैं शादी में जरूर आऊँगा।', 'I will definitely come to the wedding.'],
      ['आदरणीय प्रबंधक महोदय, मैं अपने ऑर्डर के बारे में लिख रहा हूँ।', 'Respected Manager, I am writing about my order.'],
      ['मुझे गलत उत्पाद मिला है।', 'I received the wrong product.'],
      ['कृपया इसे जल्द से जल्द बदलें।', 'Please replace it as soon as possible.'],
      ['भवदीय, राहुल शर्मा।', 'Yours faithfully, Rahul Sharma.'],
      ['प्रिय दोस्त, तुम्हारा पत्र मिला।', 'Dear friend, I received your letter.'],
      ['मैं जल्द ही तुमसे मिलने आऊँगा।', 'I will come to meet you soon.'],
      ['यह पत्र औपचारिक है।', 'This letter is formal.'],
      ['यह पत्र अनौपचारिक है।', 'This letter is informal.'],
    ],
  },
  '71': {
    topic: 'E-mail Writing',
    formula: 'Subject line intent + greeting + concise body + sign-off',
    rule: [
      "Professional emails are short and direct — one main point per email",
      "'Please find attached', 'Please check the attachment' are standard phrases",
      "Close with 'Thanks and regards' or 'Regards' + name",
      "Use polite requests: 'Could you please...', 'Please send me...'",
    ],
    pairs: [
      ['प्रिय सर, आपके ईमेल के लिए धन्यवाद।', 'Dear Sir, thank you for your email.'],
      ['मैं इस मीटिंग में शामिल नहीं हो पाऊँगा।', 'I will not be able to attend this meeting.'],
      ['कृपया मुझे रिपोर्ट भेजें।', 'Please send me the report.'],
      ['मैं जल्द ही जवाब दूँगा।', 'I will reply soon.'],
      ['यह ईमेल महत्वपूर्ण जानकारी के लिए है।', 'This email is for important information.'],
      ['कृपया अटैचमेंट देखें।', 'Please check the attachment.'],
      ['मुझे आपकी सहायता चाहिए।', 'I need your help.'],
      ['धन्यवाद और शुभकामनाएं।', 'Thanks and regards.'],
      ['मैं इस प्रोजेक्ट पर काम कर रहा हूँ।', 'I am working on this project.'],
      ['कृपया इसे प्राथमिकता दें।', 'Please give this priority.'],
      ['मैंने आपका संदेश पढ़ लिया है।', 'I have read your message.'],
      ['मैं कल तक जवाब दे दूंगा।', 'I will reply by tomorrow.'],
      ['यह ईमेल गलती से भेजा गया।', 'This email was sent by mistake.'],
      ['कृपया इसे नज़रअंदाज़ करें।', 'Please ignore this.'],
      ['मुझे मीटिंग का समय पता चाहिए।', 'I need to know the time of the meeting.'],
      ['कृपया कॉन्फ़्रेंस कॉल शेड्यूल करें।', 'Please schedule a conference call.'],
      ['मैं इस सप्ताह छुट्टी पर हूँ।', 'I am on leave this week.'],
      ['कृपया इस मामले में जल्दी कार्रवाई करें।', 'Please take quick action on this matter.'],
      ['सादर, अनीता वर्मा।', 'Regards, Anita Verma.'],
      ['मुझे उम्मीद है यह ईमेल आपको अच्छा लगेगा।', 'I hope you find this email helpful.'],
    ],
  },
  '72': {
    topic: 'Paragraph Writing',
    formula: 'Topic sentence + 2-3 supporting sentences + concluding thought',
    rule: [
      "A paragraph starts with one clear topic sentence stating the main idea",
      "Supporting sentences give reasons, examples, or details",
      "Keep tense consistent throughout the paragraph",
      "End with a short concluding or reflective sentence",
    ],
    pairs: [
      ['मेरा पसंदीदा मौसम बारिश का मौसम है।', 'My favourite season is the rainy season.'],
      ['बारिश में सब कुछ हरा-भरा हो जाता है।', 'Everything becomes green in the rain.'],
      ['मुझे किताबें पढ़ना बहुत पसंद है।', 'I like reading books a lot.'],
      ['किताबें ज्ञान का भंडार होती हैं।', 'Books are a treasure of knowledge.'],
      ['मेरा गाँव बहुत सुंदर है।', 'My village is very beautiful.'],
      ['वहाँ हरे-भरे खेत और साफ हवा है।', 'There are green fields and clean air there.'],
      ['शिक्षा जीवन में बहुत महत्वपूर्ण है।', 'Education is very important in life.'],
      ['यह हमें एक बेहतर इंसान बनाती है।', 'It makes us a better person.'],
      ['समय का सदुपयोग करना चाहिए।', 'We should make good use of time.'],
      ['जो समय बर्बाद करता है, वह पछताता है।', 'The one who wastes time regrets later.'],
      ['स्वास्थ्य ही असली धन है।', 'Health is real wealth.'],
      ['हमें रोज़ व्यायाम करना चाहिए।', 'We should exercise daily.'],
      ['मेरी माँ मेरी सबसे अच्छी दोस्त है।', 'My mother is my best friend.'],
      ['वह हमेशा मेरा साथ देती है।', 'She always supports me.'],
      ['प्रकृति हमें बहुत कुछ सिखाती है।', 'Nature teaches us a lot.'],
      ['हमें पेड़ों की रक्षा करनी चाहिए।', 'We should protect trees.'],
      ['भारत विविधताओं का देश है।', 'India is a country of diversities.'],
      ['यहाँ कई भाषाएँ और संस्कृतियाँ हैं।', 'There are many languages and cultures here.'],
      ['मेहनत सफलता की कुंजी है।', 'Hard work is the key to success.'],
      ['जो मेहनत करता है वह जरूर सफल होता है।', 'The one who works hard definitely succeeds.'],
    ],
  },
  '73': {
    topic: 'Notice Writing + Writing Skills Practice',
    formula: "'Notice:' + clear announcement + audience + action required + issuing authority",
    rule: [
      "Notices begin with the word 'Notice' and a heading describing the subject",
      "State who the notice is for, what must be done, and by when",
      "Keep notices short, formal, and to the point — no personal opinions",
      "General writing skill: clarity and conciseness matter in every format learned so far",
    ],
    pairs: [
      ['सूचना: कल विद्यालय बंद रहेगा।', 'Notice: The school will remain closed tomorrow.'],
      ['सभी छात्रों को समय पर पहुँचना है।', 'All students must arrive on time.'],
      ['यह सूचना सभी कर्मचारियों के लिए है।', 'This notice is for all employees.'],
      ['कल कार्यालय की छुट्टी रहेगी।', 'The office will be closed tomorrow.'],
      ['यह सूचना तुरंत प्रभाव से लागू है।', 'This notice is effective immediately.'],
      ['सभी को यह सूचना पढ़नी चाहिए।', 'Everyone should read this notice.'],
      ['आगामी सोमवार को बैठक आयोजित की जाएगी।', 'A meeting will be held next Monday.'],
      ['सभी सदस्यों की उपस्थिति अनिवार्य है।', 'Attendance of all members is compulsory.'],
      ['यह सूचना बोर्ड पर लगाई गई है।', 'This notice has been put up on the board.'],
      ['किसी भी प्रश्न के लिए कार्यालय से संपर्क करें।', 'Contact the office for any questions.'],
      ['यह सूचना विद्यार्थियों के हित में है।', 'This notice is in the interest of the students.'],
      ['समय सीमा का पालन करना अनिवार्य है।', 'It is mandatory to follow the deadline.'],
      ['कृपया अपने दस्तावेज़ तैयार रखें।', 'Please keep your documents ready.'],
      ['यह सूचना पूरे परिसर में प्रसारित की गई।', 'This notice was circulated throughout the campus.'],
      ['अधिक जानकारी के लिए वेबसाइट देखें।', 'Visit the website for more information.'],
      ['उपरोक्त निर्देशों का पालन करें।', 'Follow the above instructions.'],
      ['यह जानकारी सभी के लिए उपयोगी है।', 'This information is useful for everyone.'],
      ['लेखन कौशल अभ्यास से सुधरता है।', 'Writing skills improve with practice.'],
      ['रोज़ लिखने की आदत डालें।', 'Make a habit of writing daily.'],
      ['अच्छा लेखन स्पष्ट और संक्षिप्त होता है।', 'Good writing is clear and concise.'],
    ],
  },
  '74': {
    topic: 'Grammar + Vocabulary + Speaking Full Revision',
    formula: 'Mixed revision of tenses, modals, conditionals, reported speech, vocabulary and speaking confidence',
    rule: [
      "Revise all major tense forms and modal verbs learned across Days 1-73",
      "Recall the biggest vocabulary categories: daily life, office, professional, emotions",
      "Speaking fluency comes from repeating full sentences aloud, not memorising isolated words",
      "Every sentence should still follow correct subject-verb agreement",
    ],
    pairs: [
      ['मैं हर दिन अंग्रेज़ी बोलने का अभ्यास करता हूँ।', 'I practise speaking English every day.'],
      ['वह पहले से बेहतर बोलता है।', 'He speaks better than before.'],
      ['अगर मैं मेहनत करूँ, तो सफल हो जाऊँगा।', 'If I work hard, I will succeed.'],
      ['उसने कहा कि वह जल्द आएगा।', 'He said that he would come soon.'],
      ['क्या तुम आज मुझसे मिलोगे?', 'Will you meet me today?'],
      ['मुझे यह किताब पढ़नी है।', 'I have to read this book.'],
      ['वह तीन साल से यहाँ काम कर रहा है।', 'He has been working here for three years.'],
      ['तुम बहुत अच्छे इंसान हो, है ना?', "You are a very good person, aren't you?"],
      ['मुझे अंग्रेज़ी बोलने में आत्मविश्वास है।', 'I have confidence in speaking English.'],
      ['मैंने अपनी गलतियों से सीखा है।', 'I have learned from my mistakes.'],
      ['यह शब्द रोज़ के इस्तेमाल के लिए जरूरी है।', 'This word is necessary for daily use.'],
      ['वह अच्छा व्याकरण जानता है।', 'He knows good grammar.'],
      ['मैं अपने विचार स्पष्ट रूप से व्यक्त करता हूँ।', 'I express my thoughts clearly.'],
      ['यह वाक्य सही व्याकरण के साथ है।', 'This sentence is with correct grammar.'],
      ['मुझे नई शब्दावली सीखना पसंद है।', 'I like learning new vocabulary.'],
      ['आज मैंने पाँच नए शब्द सीखे।', 'Today I learned five new words.'],
      ['वह आत्मविश्वास से बोलता है।', 'He speaks with confidence.'],
      ['मैं हर गलती को सुधारने की कोशिश करता हूँ।', 'I try to correct every mistake.'],
      ['यह पूरा पाठ्यक्रम बहुत उपयोगी है।', 'This entire course is very useful.'],
      ['मैंने पिछले पचहत्तर दिनों में बहुत कुछ सीखा।', 'I have learned a lot in the last seventy-five days.'],
    ],
  },
  '75': {
    topic: 'Complete Mock Test + Final Revision',
    formula: 'Confident self-assessment sentences summarising the full 75-day journey',
    rule: [
      "Use present perfect to summarise achievements over the whole course (I have completed...)",
      "Use present simple to describe current confident ability (I can now speak...)",
      "Reflect on the starting point vs the current level to measure progress",
      "End the course with forward-looking, motivational statements",
    ],
    pairs: [
      ['मैं अब अंग्रेज़ी में धाराप्रवाह बोल सकता हूँ।', 'I can now speak English fluently.'],
      ['मैंने यह चुनौती पूरी कर ली है।', 'I have completed this challenge.'],
      ['पचहत्तर दिन पहले मैं अंग्रेज़ी नहीं बोल पाता था।', 'Seventy-five days ago I could not speak English.'],
      ['अब मुझे किसी भी विषय पर बात करने में झिझक नहीं होती।', "Now I don't hesitate to talk on any topic."],
      ['मैं ऑफिस में आत्मविश्वास से बात करता हूँ।', 'I speak confidently in the office.'],
      ['मैं इंटरव्यू में अच्छा प्रदर्शन कर सकता हूँ।', 'I can perform well in an interview.'],
      ['मुझे अब व्याकरण की अच्छी समझ है।', 'I now have a good understanding of grammar.'],
      ['मेरी शब्दावली बहुत बढ़ गई है।', 'My vocabulary has increased a lot.'],
      ['मैं ईमेल और पत्र आसानी से लिख सकता हूँ।', 'I can easily write emails and letters.'],
      ['मैं रोज़ की बातचीत आराम से कर लेता हूँ।', 'I can easily do daily conversations.'],
      ['यह मेरी सबसे बड़ी उपलब्धि है।', 'This is my biggest achievement.'],
      ['मैं अब बिना झिझक के अंग्रेज़ी बोलता हूँ।', 'I now speak English without hesitation.'],
      ['यह कोर्स मेरे जीवन में बहुत उपयोगी साबित हुआ।', 'This course has proved very useful in my life.'],
      ['मैंने हर दिन कड़ी मेहनत की।', 'I worked hard every single day.'],
      ['अब मैं नए अवसरों के लिए तैयार हूँ।', 'Now I am ready for new opportunities.'],
      ['मुझे अपनी प्रगति पर गर्व है।', 'I am proud of my progress.'],
      ['यह मेरी अंतिम परीक्षा है।', 'This is my final test.'],
      ['मैं आत्मविश्वास से यह परीक्षा दूँगा।', 'I will take this test with confidence.'],
      ['मेरी अंग्रेज़ी अब पेशेवर स्तर की है।', 'My English is now at a professional level.'],
      ['मैं हमेशा सीखते रहना चाहता हूँ।', 'I want to keep learning forever.'],
    ],
  },
};

function shuffleOptions(correct, sourceArr, seedIdx, isWord) {
  const opts = new Set([correct]);
  let i = seedIdx, guard = 0;
  while (opts.size < 4 && guard < 200) {
    guard++;
    const cand = sourceArr[(i + guard * 7) % sourceArr.length];
    const val = isWord ? cand.split(' ')[Math.min(3, cand.split(' ').length - 1)].replace(/[.,!?]/g, '') : cand;
    if (val && val !== correct) opts.add(val);
  }
  return shuffleArray(Array.from(opts));
}
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = (i * 31 + 7) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function blankOut(sentence) {
  const words = sentence.split(' ');
  let idx = Math.floor(words.length / 2);
  let word = words[idx].replace(/[.,!?]/g, '');
  if (!word) { idx = 1; word = words[1] ? words[1].replace(/[.,!?]/g, '') : words[0]; }
  return { blanked: words.map((w, i) => (i === idx ? '_____' : w)).join(' '), answer: word };
}
function makeErrorVersion(sentence) {
  const swaps = [[/\bis\b/, 'are'], [/\bare\b/, 'is'], [/\bwas\b/, 'were'], [/\bwere\b/, 'was'], [/\bwould\b/, 'will'], [/\bhad\b/, 'has'], [/\bhave\b/, 'has'], [/\bhas\b/, 'have']];
  for (const [re, rep] of swaps) if (re.test(sentence)) return sentence.replace(re, rep);
  return sentence.replace(/\.$/, '') + ' yesterday.';
}

const META = {
  '61': { emoji: '🏢', color: '#10b981' }, '62': { emoji: '🌸', color: '#f472b6' },
  '63': { emoji: '🔢', color: '#6366f1' }, '64': { emoji: '🩺', color: '#ef4444' },
  '65': { emoji: '🏭', color: '#f59e0b' }, '66': { emoji: '🎨', color: '#8b5cf6' },
  '67': { emoji: '🦅', color: '#0ea5e9' }, '68': { emoji: '⚽', color: '#22c55e' },
  '69': { emoji: '📝', color: '#eab308' }, '70': { emoji: '✉️', color: '#3b82f6' },
  '71': { emoji: '📧', color: '#06b6d4' }, '72': { emoji: '📄', color: '#ec4899' },
  '73': { emoji: '📢', color: '#f97316' }, '74': { emoji: '🔁', color: '#64748b' },
  '75': { emoji: '🏆', color: '#facc15' },
};

for (const [dd, cfg] of Object.entries(DATA)) {
  const dir = path.join('data', 'challenge', `day-${dd}`);
  const pool = cfg.pairs.map(([hindi, english]) => ({ hindi, english }));
  const prev = parseInt(dd, 10) - 1;
  const next = parseInt(dd, 10) + 1;

  const lessonSections = [
    { id: 1, title: `${cfg.topic} — Introduction and Formula`, hindiTitle: `${cfg.topic} — परिचय और फॉर्मूला`, explanation: `${cfg.topic} is an essential building block of English. Formula: ${cfg.formula}. Rules: ${cfg.rule.join(' | ')}`, formula: cfg.formula, examples: pool.slice(0, 6) },
    { id: 2, title: `${cfg.topic} — Daily Life Usage`, hindiTitle: `${cfg.topic} — रोज़मर्रा के उपयोग`, explanation: `Everyday sentences using ${cfg.topic} for daily conversation.`, formula: cfg.formula, examples: pool.slice(6, 12) },
    { id: 3, title: `${cfg.topic} — Office & Professional Usage`, hindiTitle: `${cfg.topic} — ऑफिस और पेशेवर उपयोग`, explanation: `Practice ${cfg.topic} in professional and office contexts.`, formula: cfg.formula, examples: pool.slice(12, 16) },
    { id: 4, title: `${cfg.topic} — Negative and Question Forms`, hindiTitle: `${cfg.topic} — नकारात्मक और प्रश्न रूप`, explanation: `How to make negative sentences and questions using ${cfg.topic}. Common mistakes are highlighted here.`, formula: cfg.formula, examples: pool.slice(16, 20) },
  ];
  fs.writeFileSync(path.join(dir, 'lessons.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, sections: lessonSections }, null, 2) + '\n');

  const vocabWords = pool.map((p, i) => {
    const engWords = p.english.replace(/[.,!?]/g, '').split(' ');
    const key = engWords[engWords.length - 1];
    return { id: i + 1, word: key.toLowerCase(), hindi: p.hindi.split(' ').slice(-2).join(' '), simpleMeaning: `Used in: "${p.english}"`, ipa: '', sentences: { daily: p.english, office: p.english, interview: p.english }, usageNote: `Appears with ${cfg.topic}`, cefrLevel: 'B1' };
  });
  fs.writeFileSync(path.join(dir, 'vocabulary.json'), JSON.stringify({ day: parseInt(dd, 10), title: cfg.topic, totalWords: vocabWords.length, words: vocabWords }, null, 2) + '\n');

  const practiceQs = pool.map((p, i) => ({ id: i + 1, hindi: p.hindi, english: p.english, alternatives: [], hint: `Use the pattern: ${cfg.formula}`, explanation: `Correct sentence: "${p.english}"`, difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard', tags: [cfg.topic.toLowerCase().split(' ')[0]], grammarRule: cfg.topic, category: `${cfg.topic} practice` }));
  fs.writeFileSync(path.join(dir, 'practice-questions.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalQuestions: practiceQs.length, questions: practiceQs }, null, 2) + '\n');

  const testQs = []; let qid = 1;
  pool.forEach((p, i) => {
    const type = i % 3 === 0 ? 'translate' : i % 3 === 1 ? 'fill' : 'error';
    if (type === 'translate') testQs.push({ id: qid++, type: 'translate', hindi: p.hindi, options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english, explanation: `Correct translation: "${p.hindi}" = "${p.english}"` });
    else if (type === 'fill') { const { blanked, answer } = blankOut(p.english); testQs.push({ id: qid++, type: 'fill', sentence: blanked, options: shuffleOptions(answer, pool.map((x) => x.english), i, true), answer, explanation: `Full sentence: "${p.english}"` }); }
    else { const wrong = makeErrorVersion(p.english); testQs.push({ id: qid++, type: 'error', sentence: wrong, options: [wrong, p.english], answer: p.english, explanation: `Correct sentence: "${p.english}"` }); }
  });
  fs.writeFileSync(path.join(dir, 'daily-test.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalQuestions: testQs.length, questions: testQs }, null, 2) + '\n');

  const drills = [];
  for (let i = 0; i < pool.length; i += 3) { const chunk = pool.slice(i, i + 3); if (!chunk.length) break; drills.push({ id: drills.length + 1, type: 'repeat-and-speak', title: `${cfg.topic} — Speaking Set ${drills.length + 1}`, sentences: chunk.map((p) => ({ english: p.english, hindi: p.hindi, pronunciation: p.english.toLowerCase().replace(/[.,!?]/g, '') })) }); }
  fs.writeFileSync(path.join(dir, 'speaking-drill.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, totalDrills: drills.length, drills }, null, 2) + '\n');

  const writingTasks = [
    { id: 1, type: 'sentence-writing', prompt: `Write 5 original English sentences using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए 5 नए वाक्य लिखिए।`, sampleAnswer: pool.slice(0, 5).map((p) => p.english).join(' '), wordLimit: 60 },
    { id: 2, type: 'paragraph-writing', prompt: `Write a short paragraph (5-6 lines) using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए एक छोटा पैराग्राफ लिखिए।`, sampleAnswer: pool.slice(5, 10).map((p) => p.english).join(' '), wordLimit: 80 },
    { id: 3, type: 'translation', prompt: `Translate into English: "${pool[10].hindi}"`, hindiPrompt: 'नीचे दिए गए वाक्य का अंग्रेज़ी अनुवाद करें।', sampleAnswer: pool[10].english, wordLimit: 20 },
    { id: 4, type: 'correction', prompt: `Correct this sentence: "${makeErrorVersion(pool[3].english)}"`, hindiPrompt: 'इस वाक्य में गलती ठीक कीजिए।', sampleAnswer: pool[3].english, wordLimit: 20 },
    { id: 5, type: 'dialogue-writing', prompt: `Write a short 4-line dialogue using ${cfg.topic}.`, hindiPrompt: `${cfg.topic} का उपयोग करते हुए एक संवाद लिखिए।`, sampleAnswer: pool.slice(12, 16).map((p) => p.english).join(' '), wordLimit: 60 },
  ];
  fs.writeFileSync(path.join(dir, 'writing-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, tasks: writingTasks }, null, 2) + '\n');

  const readingQs = pool.slice(0, 8).map((p, i) => ({ id: i + 1, question: `What does the passage say about: "${p.english.split(' ').slice(0, 4).join(' ')}..."?`, options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english, explanation: `Stated in the passage: "${p.english}"` }));
  fs.writeFileSync(path.join(dir, 'reading-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, passage: { title: `A Day with ${cfg.topic}`, text: pool.slice(0, 10).map((p) => p.english).join(' '), hindiTranslation: pool.slice(0, 10).map((p) => p.hindi).join(' ') }, comprehensionQuestions: readingQs }, null, 2) + '\n');

  const listenPool = pool.slice(10, 18).length >= 6 ? pool.slice(10, 18) : pool.slice(0, 10);
  const listenExercises = listenPool.slice(0, 8).map((p, i) => ({ id: i + 1, audioScript: p.english, hindiScript: p.hindi, question: 'What did you hear? Choose the correct sentence.', options: shuffleOptions(p.english, pool.map((x) => x.english), i), answer: p.english }));
  fs.writeFileSync(path.join(dir, 'listening-exercise.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, exercises: listenExercises, dictationPassage: { text: listenPool.slice(0, 5).map((p) => p.english).join(' '), hindiTranslation: listenPool.slice(0, 5).map((p) => p.hindi).join(' ') } }, null, 2) + '\n');

  const quickQuiz = pool.slice(0, 10).map((p, i) => ({ id: i + 1, hindi: p.hindi, answer: p.english }));
  fs.writeFileSync(path.join(dir, 'revision.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, keyPointsSummary: cfg.rule, quickQuiz, mustRememberRules: cfg.rule.slice(0, 4) }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'milestones.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, milestones: [
    { id: 1, title: 'Lesson Completed', description: `Finished all lessons on ${cfg.topic}.`, xp: 20, badge: 'lesson-complete' },
    { id: 2, title: 'Vocabulary Mastered', description: `Learned new words related to ${cfg.topic}.`, xp: 15, badge: 'vocab-master' },
    { id: 3, title: 'Practice Champion', description: `Completed all practice questions for Day ${parseInt(dd, 10)}.`, xp: 25, badge: 'practice-champion' },
    { id: 4, title: 'Test Passed', description: `Scored well on the Day ${parseInt(dd, 10)} test.`, xp: 30, badge: 'test-passed' },
    { id: 5, title: 'Speaking Practiced', description: `Completed speaking drills for ${cfg.topic}.`, xp: 20, badge: 'speaking-star' },
  ] }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'morning-routine.json'), JSON.stringify({ day: parseInt(dd, 10), topic: cfg.topic, steps: [
    { id: 1, title: 'Warm-up Reading', description: "Read yesterday's revision notes for 5 minutes.", duration: 5 },
    { id: 2, title: `Today's Topic: ${cfg.topic}`, description: `Read through all lesson sections on ${cfg.topic}.`, duration: 15 },
    { id: 3, title: 'Vocabulary Practice', description: "Learn and repeat today's new vocabulary words aloud.", duration: 10 },
    { id: 4, title: 'Practice Questions', description: `Solve today's practice questions on ${cfg.topic}.`, duration: 15 },
    { id: 5, title: 'Speaking Drill', description: "Speak today's example sentences aloud 3 times each.", duration: 10 },
  ] }, null, 2) + '\n');

  fs.writeFileSync(path.join(dir, 'challenge.json'), JSON.stringify({
    day: parseInt(dd, 10), topic: cfg.topic,
    challengeTask: `Use at least 10 sentences with ${cfg.topic} in a real conversation or diary entry today.`,
    hindiTask: `आज ${cfg.topic} का उपयोग करते हुए कम से कम 10 वाक्य किसी असली बातचीत या डायरी में लिखें।`,
    successCriteria: ['All 10 sentences are grammatically correct', `${cfg.topic} rule applied correctly in every sentence`, 'No spelling mistakes'],
    bonusChallenge: 'Record yourself speaking 5 of these sentences and check your pronunciation.',
    xpReward: 50,
  }, null, 2) + '\n');

  const m = META[dd];
  const meta = { day: parseInt(dd, 10), title: cfg.topic, slug: `${dd}-${cfg.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`, type: 'vocabulary', difficulty: 'intermediate', cefr: 'B2', emoji: m.emoji, color: m.color, topics: [cfg.topic], totalQuestions: pool.length, totalVocabulary: pool.length, estimatedTime: '2-3 hours', xpReward: 200, coinsReward: 30, prerequisites: dd === '61' ? [prev] : [prev], nextDay: parseInt(dd, 10) === 75 ? null : next, tags: ['vocabulary', cfg.topic.toLowerCase()], lastUpdated: '2026-07-09', version: '1.0' };
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

  const overview = { day: parseInt(dd, 10), title: cfg.topic, tagline: `${cfg.topic} को सही तरीके से समझें और बोलें।`, summary: `${cfg.topic} का सही उपयोग आपकी English को ज़्यादा natural और fluent बनाता है। Formula: ${cfg.formula}`, hindiSummary: `आज आप ${cfg.topic} का सही उपयोग सीखेंगे — कब और कैसे इसे बोलचाल और लेखन में use करना है।`, whatYouWillLearn: [`${cfg.topic} की सही formula और structure`, `${cfg.topic} के साथ positive, negative और question sentences`, `${cfg.topic} का daily life और office में उपयोग`, 'Common mistakes जो लोग यहां करते हैं'] };
  fs.writeFileSync(path.join(dir, 'overview.json'), JSON.stringify(overview, null, 2) + '\n');

  console.log(`day-${dd}: wrote all 14 files (pool size ${pool.length})`);
}
