/**
 * Grammar Rule Constants - Common English grammar rule references
 */

/** Tense names and their structures */
export const TENSES = {
  SIMPLE_PRESENT:       { id: 'simple-present',        label: 'Simple Present',         structure: 'S + V(s/es) + O',                example: 'She plays cricket.' },
  PRESENT_CONTINUOUS:   { id: 'present-continuous',    label: 'Present Continuous',     structure: 'S + is/am/are + V-ing + O',       example: 'She is playing cricket.' },
  PRESENT_PERFECT:      { id: 'present-perfect',       label: 'Present Perfect',        structure: 'S + has/have + V3 + O',           example: 'She has played cricket.' },
  PRESENT_PERF_CONT:    { id: 'present-perf-cont',     label: 'Present Perfect Cont.',  structure: 'S + has/have been + V-ing + O',   example: 'She has been playing cricket.' },
  SIMPLE_PAST:          { id: 'simple-past',           label: 'Simple Past',            structure: 'S + V2 + O',                      example: 'She played cricket.' },
  PAST_CONTINUOUS:      { id: 'past-continuous',       label: 'Past Continuous',        structure: 'S + was/were + V-ing + O',        example: 'She was playing cricket.' },
  PAST_PERFECT:         { id: 'past-perfect',          label: 'Past Perfect',           structure: 'S + had + V3 + O',                example: 'She had played cricket.' },
  PAST_PERF_CONT:       { id: 'past-perf-cont',        label: 'Past Perfect Cont.',     structure: 'S + had been + V-ing + O',        example: 'She had been playing for 2 hours.' },
  SIMPLE_FUTURE:        { id: 'simple-future',         label: 'Simple Future',          structure: 'S + will + V1 + O',               example: 'She will play cricket.' },
  FUTURE_CONTINUOUS:    { id: 'future-continuous',     label: 'Future Continuous',      structure: 'S + will be + V-ing + O',         example: 'She will be playing cricket.' },
  FUTURE_PERFECT:       { id: 'future-perfect',        label: 'Future Perfect',         structure: 'S + will have + V3 + O',          example: 'She will have played cricket.' },
  FUTURE_PERF_CONT:     { id: 'future-perf-cont',      label: 'Future Perfect Cont.',   structure: 'S + will have been + V-ing + O',  example: 'She will have been playing for 2 hours.' },
};

/** Modal verbs and their uses */
export const MODAL_VERBS = {
  CAN:      { modal: 'can',      use: 'Ability / Permission',           example: 'I can swim.' },
  COULD:    { modal: 'could',    use: 'Past ability / Polite request',  example: 'Could you help me?' },
  WILL:     { modal: 'will',     use: 'Future / Certainty',             example: 'It will rain tomorrow.' },
  WOULD:    { modal: 'would',    use: 'Conditional / Polite',           example: 'I would like tea.' },
  SHALL:    { modal: 'shall',    use: 'Formal future / Suggestion',     example: 'Shall we begin?' },
  SHOULD:   { modal: 'should',   use: 'Advice / Obligation',            example: 'You should rest.' },
  MAY:      { modal: 'may',      use: 'Possibility / Permission',       example: 'It may rain today.' },
  MIGHT:    { modal: 'might',    use: 'Weaker possibility',             example: 'She might come.' },
  MUST:     { modal: 'must',     use: 'Strong obligation / Deduction',  example: 'You must wear a seatbelt.' },
  OUGHT_TO: { modal: 'ought to', use: 'Moral obligation',               example: 'You ought to apologize.' },
  NEED:     { modal: 'need',     use: 'Necessity',                      example: 'You need not worry.' },
  DARE:     { modal: 'dare',     use: 'Challenge / Boldness',           example: 'How dare you!' },
  USED_TO:  { modal: 'used to',  use: 'Past habit no longer true',      example: 'I used to wake up early.' },
};

/** Parts of speech */
export const PARTS_OF_SPEECH = [
  { id: 'noun',        label: 'Noun',        definition: 'A person, place, thing, or idea.',       example: 'dog, city, happiness' },
  { id: 'pronoun',     label: 'Pronoun',     definition: 'Replaces a noun.',                       example: 'he, she, they, it' },
  { id: 'verb',        label: 'Verb',        definition: 'An action or state of being.',           example: 'run, is, think' },
  { id: 'adjective',   label: 'Adjective',   definition: 'Describes a noun.',                     example: 'tall, red, happy' },
  { id: 'adverb',      label: 'Adverb',      definition: 'Describes a verb, adjective, or adverb.',example: 'quickly, very, well' },
  { id: 'preposition', label: 'Preposition', definition: 'Shows relationship between words.',      example: 'in, on, at, with' },
  { id: 'conjunction', label: 'Conjunction', definition: 'Connects words or clauses.',             example: 'and, but, or, because' },
  { id: 'interjection',label: 'Interjection',definition: 'Expresses emotion.',                    example: 'Oh!, Wow!, Ouch!' },
  { id: 'article',     label: 'Article',     definition: 'Defines a noun as specific or general.', example: 'a, an, the' },
];

/** Conditional sentence types */
export const CONDITIONALS = {
  ZERO:  { type: 'Zero',  structure: 'If + Present, Present',              use: 'General truth',             example: 'If you heat water, it boils.' },
  FIRST: { type: 'First', structure: 'If + Present, will + V1',            use: 'Real/possible future',      example: 'If it rains, I will stay home.' },
  SECOND:{ type: 'Second',structure: 'If + Past Simple, would + V1',       use: 'Unreal/hypothetical',       example: 'If I had money, I would travel.' },
  THIRD: { type: 'Third', structure: 'If + Past Perfect, would have + V3', use: 'Unreal past (regret)',      example: 'If I had studied, I would have passed.' },
  MIXED: { type: 'Mixed', structure: 'If + Past Perfect, would + V1',      use: 'Past cause, present effect',example: 'If I had slept, I would not be tired now.' },
};

/** Article usage rules */
export const ARTICLE_RULES = {
  A:   { article: 'a',   use: 'Before singular countable nouns starting with consonant sound', example: 'a book, a car' },
  AN:  { article: 'an',  use: 'Before singular countable nouns starting with vowel sound',    example: 'an apple, an hour' },
  THE: { article: 'the', use: 'Before specific or previously mentioned nouns',                 example: 'the sun, the book I read' },
  NO:  { article: '(no article)', use: 'Before plural nouns, uncountable nouns in general sense', example: 'Dogs are friendly. I like music.' },
};

/** Active and Passive Voice structures */
export const VOICE_STRUCTURES = {
  ACTIVE:  { label: 'Active Voice',  structure: 'Subject + Verb + Object',               example: 'She wrote the letter.' },
  PASSIVE: { label: 'Passive Voice', structure: 'Object + be + Past Participle + by Sub', example: 'The letter was written by her.' },
};

/** Common irregular verbs (V1, V2, V3) */
export const IRREGULAR_VERBS = [
  { v1: 'be',    v2: 'was/were', v3: 'been' },
  { v1: 'go',    v2: 'went',     v3: 'gone' },
  { v1: 'have',  v2: 'had',      v3: 'had' },
  { v1: 'do',    v2: 'did',      v3: 'done' },
  { v1: 'make',  v2: 'made',     v3: 'made' },
  { v1: 'take',  v2: 'took',     v3: 'taken' },
  { v1: 'come',  v2: 'came',     v3: 'come' },
  { v1: 'see',   v2: 'saw',      v3: 'seen' },
  { v1: 'know',  v2: 'knew',     v3: 'known' },
  { v1: 'get',   v2: 'got',      v3: 'gotten/got' },
  { v1: 'give',  v2: 'gave',     v3: 'given' },
  { v1: 'think', v2: 'thought',  v3: 'thought' },
  { v1: 'say',   v2: 'said',     v3: 'said' },
  { v1: 'find',  v2: 'found',    v3: 'found' },
  { v1: 'tell',  v2: 'told',     v3: 'told' },
  { v1: 'write', v2: 'wrote',    v3: 'written' },
  { v1: 'read',  v2: 'read',     v3: 'read' },
  { v1: 'speak', v2: 'spoke',    v3: 'spoken' },
  { v1: 'buy',   v2: 'bought',   v3: 'bought' },
  { v1: 'teach', v2: 'taught',   v3: 'taught' },
];

export default {
  TENSES,
  MODAL_VERBS,
  PARTS_OF_SPEECH,
  CONDITIONALS,
  ARTICLE_RULES,
  VOICE_STRUCTURES,
  IRREGULAR_VERBS,
};
