/* eslint-disable unicorn/no-array-reduce */
import { faker } from '@faker-js/faker';
import { type InternalElection } from 'universe/backend/db';
import { getEnv } from 'universe/backend/env';

const questions = {
  best1: 'What is your favorite {{noun}}?',
  best2: 'Which {{noun}} sounds best?',
  best3: 'Coolest {{noun}}?',
  best4: 'Hey, what is the most useful {{noun}}?',
  worst: 'What is your least favorite {{noun}}?',
  adjective: 'Which {{noun}} is the {{superlative}} {{adjective}}?',
  compare: 'Is a {{thing1}} {{compare}} a {{thing2}}?',
  super: 'For Super Earth?'
};

const fakerNounMethods: [noun: string, objectNotation: string][] = [
  ['airline', 'airline.airline().name'],
  ['airport', 'airline.airport().name'],
  ['airplane', 'airline.airplane().name'],

  ['animal', 'animal.type()'],
  ['bear', 'animal.bear()'],
  ['bird', 'animal.bird()'],
  ['cat', 'animal.cat()'],
  ['cetacean', 'animal.cetacean()'],
  ['cow', 'animal.cow()'],
  ['crocodilia', 'animal.crocodilia()'],
  ['dog', 'animal.dog()'],
  ['fish', 'animal.fish()'],
  ['horse', 'animal.horse()'],
  ['insect', 'animal.insect()'],
  ['lion', 'animal.lion()'],
  ['rabbit', 'animal.rabbit()'],
  ['rodent', 'animal.rodent()'],
  ['snake', 'animal.snake()'],

  ['color', 'color.human()'],

  ['product', 'commerce.product()'],
  ['department', 'commerce.department()'],
  ['price', 'commerce.price()'],

  ['company', 'company.name()'],
  ['buzzword', 'company.buzzNoun()'],

  ['database engine', 'database.engine()'],

  ['git branch name', 'git.branch()'],

  ['hacker abbreviation', 'hacker.adjective()'],

  ['username', 'internet.displayName()'],
  ['domain name', 'internet.domainName()'],
  ['domain name', 'internet.domainName()'],

  ['city', 'location.city()'],
  ['state', 'location.state()'],
  ['country', 'location.country()'],

  ['music genre', 'music.genre()'],
  ['song name', 'music.songName()'],

  ['job', 'person.jobType()'],
  ['job title', 'person.jobTitle()'],

  ['chemical', 'science.chemicalElement().name'],

  ['file type', 'system.commonFileType()'],

  ['vehicle', 'vehicle.vehicle()'],
  ['vehicle type', 'vehicle.type()'],
  ['bike', 'vehicle.bicycle()'],
  ['manufacturer', 'vehicle.manufacturer()'],
  ['car model', 'vehicle.model()']
];

const superlatives = ['most', 'least'];

const comparisonWords = [
  'better than',
  'greater than',
  'worse than',
  'as good as',
  'nicer than',
  'more beautiful than'
];

const likertScale = [
  'strong yes',
  'moderate yes',
  'unsure/ambivalent',
  'moderate no',
  'strong no'
];

function getStringFromFaker(methodString: string) {
  const str = methodString.split('.').reduce((f, method) => {
    // @ts-expect-error: TS is not smart enough to figure this out
    return method.endsWith('()') ? f[method.slice(0, -2)]() : f[method];
  }, faker);

  if (typeof str !== 'string') {
    throw new TypeError('str is not a string');
  }

  return str;
}

export function getRandomFakeElectionData() {
  const {
    MAX_ELECTION_DESC_LENGTH,
    MAX_ELECTION_OPTION_LENGTH,
    MAX_ELECTION_TITLE_LENGTH,
    MAX_ELECTION_OPTIONS_ITEMS
  } = getEnv();

  const chosenKey = faker.helpers.objectKey(questions);

  const data: Pick<InternalElection, 'title' | 'description' | 'options'> = {
    title: '',
    description: faker.lorem.words({ min: 0, max: 50 }),
    options: Array.from({
      length: faker.helpers.rangeToNumber({
        min: 0,
        max: MAX_ELECTION_OPTIONS_ITEMS
      })
    })
  };

  switch (chosenKey) {
    case 'best1':
    case 'best2':
    case 'best3':
    case 'best4':
    case 'worst': {
      const [noun, objNotation] = faker.helpers.arrayElement(fakerNounMethods);
      data.title = faker.helpers.mustache(questions[chosenKey], { noun });
      data.options = data.options.map(() => getStringFromFaker(objNotation));
      break;
    }

    case 'adjective': {
      const [noun, objNotation] = faker.helpers.arrayElement(fakerNounMethods);
      data.options = data.options.map(() => getStringFromFaker(objNotation));
      data.title = faker.helpers.mustache(questions[chosenKey], {
        noun,
        superlative: faker.helpers.arrayElement(superlatives),
        adjective: faker.word.adjective()
      });
      break;
    }

    case 'compare': {
      const [, objNotation] = faker.helpers.arrayElement(fakerNounMethods);
      data.options = likertScale;
      data.title = faker.helpers.mustache(questions[chosenKey], {
        thing1: getStringFromFaker(objNotation),
        thing2: getStringFromFaker(objNotation),
        compare: faker.helpers.arrayElement(comparisonWords)
      });
      break;
    }

    case 'super': {
      data.title = questions[chosenKey];
      data.options = likertScale;
      break;
    }

    default: {
      throw new TypeError(`${chosenKey} is unhandled`);
    }
  }

  data.title = data.title.slice(0, MAX_ELECTION_TITLE_LENGTH);
  data.description = data.description.slice(0, MAX_ELECTION_DESC_LENGTH);
  data.options = Array.from(
    // ? Ensure options are unique
    new Set(data.options.map((option) => option.slice(0, MAX_ELECTION_OPTION_LENGTH)))
  );

  return data;
}
